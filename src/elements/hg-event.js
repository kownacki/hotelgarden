import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {collection, getDocs} from 'firebase/firestore';
import {createEventJsonLd} from '../../utils/seo.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, db, getFromDb, updateInDb, updateInObjectInDb} from '../utils/database.js';
import {cleanTextForMetaDescription} from '../utils.js';
import {ObjectDbSyncController} from '../utils/ObjectDbSyncController.js';
import './hg-event/hg-event-content.js';
import './hg-event/hg-event-header.js';
import './hg-event/hg-event-sidebar.js';
import './hg-page/hg-page-loading.js';

export const HgEventEditFields = {
  DATE: 'date',
  PUBLIC: 'public',
  PROMOTED: 'promoted',
};

export class HgEvent extends LitElement {
  _firebaseAuth;
  _eventDbSync;
  static properties = {
    eventData: Object, // EventData
    promotedEventData: Object, // EventData | undefined
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
      top: calc(20px + var(--headerHeight));
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
    this._eventDbSync = new ObjectDbSyncController(
      this,
      async () => {
        return this.eventData.event;
      },
      async (objectPath, dataPath, data) => {
        updateInObjectInDb(objectPath, dataPath, data);
        return data;
      },
      () => {},
      (event) => {
        this.eventData = {...this.eventData, event};
      },
    );
    (async () => {
      const dynamicPathPagesSnapshot = await getDocs(collection(db, 'dynamicPathPages'));
      this._allDynamicPathPages = dynamicPathPagesSnapshot.docs.map((dynamicPathPage) => dynamicPathPage.data());
      this._allDynamicPathPagesReady = true;
    })();
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('eventData') && this.eventData.event) {
      this._eventDbSync.setPath(createDbPath('events/events', this.eventData.uid));

      const eventJsonLd = createEventJsonLd(this.eventData.event);
      this.dispatchEvent(new CustomEvent('set-json-ld', {detail: eventJsonLd}));

      this._content = await getFromDb(createDbPath(`eventsContents/${this.eventData.uid}`, 'content'));
      this.dispatchEvent(new CustomEvent('set-meta-description', {detail: this._content}));
      this._contentReady = true;
    }
  }
  updatePromoted(selected) {
    const promotedDbPath = createDbPath('events/promoted', 'uid');
    updateInDb(promotedDbPath, selected ? this.eventData.uid : null);
  }
  updateContent(text) {
    this._content = text;
    updateInDb(createDbPath(`eventsContents/${this.eventData.uid}`, 'content'), text);
    const cleanedText = cleanTextForMetaDescription(text);
    updateInDb(createDbPath(`eventsData/${this.eventData.uid}`, 'seo.description'), cleanedText);
    this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText}));
  }
  render() {
    return html`
      ${!this.eventData.event ? '' : html`
        <div class="main">
          <hg-event-header
            .eventData=${this.eventData}
            .promotedEventData=${this.promotedEventData}
            @request-change=${({detail: {field, value}}) => {
              if (field === HgEventEditFields.DATE) {
                this._eventDbSync.requestFieldUpdate('date', value);
              } else if (field === HgEventEditFields.PUBLIC) {
                this._eventDbSync.requestFieldUpdate('public', value);
              } else if (field === HgEventEditFields.PROMOTED) {
                this.updatePromoted(value);
              }
            }}>
          </hg-event-header>
          <div class="divider"></div>
          ${this._contentReady
            ? html`<hg-event-content
              .content=${this._content}
              @content-changed=${({detail: text}) => {
                this.updateContent(text);
              }}>
            </hg-event-content>`
            : html`<hg-page-loading></hg-page-loading>`
          }
        </div>
      `}
      <div class="sidebar-container">
        ${when(
          this._allDynamicPathPagesReady,
          () => html`
            <hg-event-sidebar
              .selected=${this.eventData.uid}
              .events=${this._allDynamicPathPages}>
            </hg-event-sidebar>
          `,
          () => html`<hg-page-loading></hg-page-loading>`,
        )}
      </div>
    `;
  }
}
customElements.define('hg-event', HgEvent);
