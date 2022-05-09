import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import '@material/mwc-button';
import {DynamicPathPageType, getEventFormattedDate, getNewsFormattedDate, isNewsBeforePublish} from '../../../utils/events.js';
import {createDynamicPath} from '../../../utils/urlStructure.js';
import '../../elements/mkwc/hg-image.js';
import sharedStyles from '../../styles/shared-styles.js'

export class HgDynamicPathPageCard extends LitElement {
  static properties = {
    dynamicPathPage: Object, // DynamicPathPageEventWithUid || DynamicPathPageNewsWithUid
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      margin: 20px 0;
      background: rgba(var(--secondary-color-rgb), 0.075);
      transition: background 0.3s ease;
    }
    :host(:hover) {
      background: rgba(var(--primary-color-rgb), 0.25);
    }
    .content {
      flex: 1;
      padding: 30px;
    }
    a {
      color: var(--secondary-color);
      text-decoration: none;
      display: flex;
    }
    hg-image {
      width: 300px;
      min-width: 300px;
      height: 200px;
    }
    .header {
      display: flex;
      align-items: baseline;
      margin: 0 20px 0 0;
    }
    .type {
      flex: 1;
      margin-bottom: 5px;
    }
    .date {
      color: var(--primary-color);
      font-size: 18px;
      margin-bottom: 5px;
    }
    h3 {
      margin-top: 0;
      font-weight: 400;
      font-size: 24px;
    }
    .non-public {
      color: red;
      text-transform: uppercase;
    }
    .more {
      color: var(--primary-color);
      font-size: 18px;
    }
    mwc-icon {
      --mdc-icon-size: 22px;
      vertical-align: text-bottom;
    }
    @media all and (max-width: 839px) {
      hg-image {
        width: 200px;
        min-width: 200px;
        height: 250px;
      }
      .header {
        flex-direction: column-reverse;
      }
    }
    @media all and (max-width: 599px) {
      .content {
        padding: 20px;
      }
      hg-image {
        width: 100%;
        min-width: auto;
        height: 200px;
      }
      a {
        display: block;
      }
      h3 {
        font-size: 21px;
      }
    }
  `];
  render() {
    return html`
      <a href=${createDynamicPath(this.dynamicPathPage.permalink)}>
        <hg-image
          .src=${_.get('image.url', this.dynamicPathPage)}
          .ready=${true}
          .fit=${'cover'}>
        </hg-image>
        <div class="content">
          <div class="header">
            <div class="type">
              ${this.dynamicPathPage.type === DynamicPathPageType.EVENT 
                ? 'Wydarzenie' 
                : 'Aktualności'}
            </div>
            <div class="date">
              ${this.dynamicPathPage.type === DynamicPathPageType.EVENT
                ? getEventFormattedDate(this.dynamicPathPage)
                : getNewsFormattedDate(this.dynamicPathPage)}
            </div>
          </div>
          <div class="main">
            <h3>
              ${when(
                this.dynamicPathPage.type === DynamicPathPageType.EVENT,
                () => when(
                  !this.dynamicPathPage.public,
                  () => html`
                    <span class="non-public">Niepubliczne</span>&nbsp;
                  `,
                ),
                () => html`
                  ${when(
                    isNewsBeforePublish(this.dynamicPathPage),
                    () => html`
                      <span class="non-public">Zaplanowana publikacja</span>&nbsp;
                    `,
                  )}
                `,
              )}
              ${this.dynamicPathPage.title}
            </h3>
          </div>
          <div class="more">Zobacz więcej <mwc-icon>add</mwc-icon></div>
        </div>
      </a>
    `;
  }
}
customElements.define('hg-dynamic-path-page-card', HgDynamicPathPageCard);
