import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {DynamicPathPageType} from '../../utils/events.js';
import {createDynamicPathPageJsonLd} from '../../utils/seo.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, getFromDb, updateInDb, updateInObjectInDb} from '../utils/database.js';
import {cleanTextForMetaDescription, getAllDynamicPathPages} from '../utils.js';
import {ObjectDbSyncController} from '../utils/ObjectDbSyncController.js';
import './hg-dynamic-path-page/event/hg-event-header.js';
import './hg-dynamic-path-page/news/hg-news-header.js';
import './hg-dynamic-path-page/hg-dynamic-path-page-content.js';
import './hg-dynamic-path-page/hg-dynamic-path-page-sidebar.js';
import './hg-page/hg-page-loading.js';

export const HgEventEditFields = {
  DATE: 'date',
  PUBLIC: 'public',
  PROMOTED: 'promoted',
};

export const HgNewsEditFields = {
  DATE: 'date',
  PROMOTED: 'promoted',
};

export class HgDynamicPathPage extends LitElement {
  _firebaseAuth;
  _dynamicPathPageDbSync;
  static properties = {
    dynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    _content: String,
    _contentReady: Boolean,
    _allDynamicPathPages: Array, // DynamicPathPage[]
    _allDynamicPathPagesReady: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: flex;
      justify-content: center;
      max-width: 1040px;
      margin: auto;
      padding: 20px 20px 40px;
    }
    .main {
      flex: 1;
      box-sizing: border-box;
      max-width: 720px;
      padding: 0 60px;
    }
    .sidebar-container {
      align-self: flex-start;
      position: sticky;
      top: calc(20px + var(--header-height));
      width: 280px;
      max-width: 100%;
    }
    @media all and (max-width: 959px) {
      :host {
        flex-direction: column;
        align-items: center;
      }
      .main {
        width: 720px;
        max-width: 100%;
        padding: 0;
        margin: auto;
      }
      .sidebar-container {
        align-self: auto;
        top: 0;
        margin-top: 40px;
        min-width: auto;
      }
    }
  `];
  constructor() {
    super();
    this._dynamicPathPageDbSync = new ObjectDbSyncController(
      this,
      {
        getObject: async () => {
          return this.dynamicPathPage;
        },
        updateField: async (objectPath, dataPath, data) => {
          updateInObjectInDb(objectPath, dataPath, data);
          return data;
        },
        onDataChange: (dynamicPathPage) => {
          this.dynamicPathPage = dynamicPathPage;
        },
      },
    );
    (async () => {
      this._allDynamicPathPages = await getAllDynamicPathPages();
      this._allDynamicPathPagesReady = true;
    })();
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('dynamicPathPage') && this.dynamicPathPage) {
      this._dynamicPathPageDbSync.setPath(createDbPath(`dynamicPathPages/${this.dynamicPathPage.uid}`));

      const eventJsonLd = createDynamicPathPageJsonLd(this.dynamicPathPage);
      this.dispatchEvent(new CustomEvent('set-json-ld', {detail: eventJsonLd}));

      this._content = await getFromDb(createDbPath(`dynamicPathPages/${this.dynamicPathPage.uid}/data/content`, 'content'));
      this.dispatchEvent(new CustomEvent('set-meta-description', {detail: this._content}));
      this._contentReady = true;
    }
  }
  updatePromoted(selected) {
    const promotedDbPath = createDbPath('events/promoted', 'uid');
    updateInDb(promotedDbPath, selected ? this.dynamicPathPage.uid : null);
  }
  updateContent(text) {
    this._content = text;
    updateInDb(createDbPath(`dynamicPathPages/${this.dynamicPathPage.uid}/data/content`, 'content'), text);
    const cleanedText = cleanTextForMetaDescription(text);
    updateInDb(createDbPath(`dynamicPathPages/${this.dynamicPathPage.uid}/data/seo`, 'seo.description'), cleanedText);
    this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText}));
  }
  render() {
    return html`
      ${when(
        this.dynamicPathPage,
        () => html`
          <div class="main">
            ${when(
              this.dynamicPathPage.type === DynamicPathPageType.EVENT,
              () => html`
                <hg-event-header
                  .event=${this.dynamicPathPage}
                  .promotedDynamicPathPage=${this.promotedDynamicPathPage}
                  @request-change=${async ({detail: {field, value}}) => {
                    if (field === HgEventEditFields.DATE) {
                      await this._dynamicPathPageDbSync.requestFieldUpdate('startDate', value.startDate);
                      this._dynamicPathPageDbSync.requestFieldUpdate('endDate', value.endDate);
                    } else if (field === HgEventEditFields.PUBLIC) {
                      this._dynamicPathPageDbSync.requestFieldUpdate('public', value);
                    } else if (field === HgEventEditFields.PROMOTED) {
                      this.updatePromoted(value);
                    }
                  }}>
                </hg-event-header>
              `,
              () => html`
                <hg-news-header
                  .news=${this.dynamicPathPage}
                  .promotedDynamicPathPage=${this.promotedDynamicPathPage}
                  @request-change=${async ({detail: {field, value}}) => {
                    if (field === HgNewsEditFields.DATE) {
                      await this._dynamicPathPageDbSync.requestFieldUpdate('publishDate', value.publishDate);
                      this._dynamicPathPageDbSync.requestFieldUpdate('unpublishDate', value.unpublishDate);
                    } else if (field === HgNewsEditFields.PROMOTED) {
                      this.updatePromoted(value);
                    }
                  }}>
                </hg-news-header>
              `,
            )}
            <div class="divider"></div>
            ${this._contentReady
              ? html`<hg-dynamic-path-page-content
                .content=${this._content}
                @content-changed=${({detail: text}) => {
                  this.updateContent(text);
                }}>
              </hg-dynamic-path-page-content>`
              : html`<hg-page-loading></hg-page-loading>`
            }
          </div>
        `,
      )}
      <div class="sidebar-container">
        ${when(
          this._allDynamicPathPagesReady,
          () => html`
            <hg-dynamic-path-page-sidebar
              .selected=${this.dynamicPathPage?.uid}
              .dynamicPathPages=${this._allDynamicPathPages}>
            </hg-dynamic-path-page-sidebar>
          `,
          () => html`<hg-page-loading></hg-page-loading>`,
        )}
      </div>
    `;
  }
}
customElements.define('hg-dynamic-path-page', HgDynamicPathPage);
