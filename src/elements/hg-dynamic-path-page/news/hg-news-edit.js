import {LitElement, html, css} from 'lit';
import '@material/mwc-snackbar';
import sharedStyles from '../../../styles/shared-styles.js';
import {HgNewsEditFields} from '../../hg-dynamic-path-page.js';
import './hg-news-edit/hg-news-edit-date.js';
import './hg-news-edit/hg-news-promote-switch.js';

export class HgNewsEdit extends LitElement {
  static properties = {
    news: Object, // DynamicPathPageNewsWithUid
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
  };
  static styles = [sharedStyles, css`
    .container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    hg-news-edit-date {
      margin-left: 5px;
    }
    hg-news-promote-switch {
      margin-left: 14px;
    }
    mwc-snackbar {
      z-index: 104;
    }
    @media all and (max-width: 599px) {
      hg-news-edit-date {
        margin-left: 0;
      }
    }
  `];
  _closeAllSnackbars() {
    const snackbars = this.shadowRoot.querySelectorAll('mwc-snackbar');
    snackbars.forEach((snackbar) => snackbar.close());
  }
  render() {
    return html`
      <div class="container cms">
        <hg-news-edit-date
          .publishDate=${this.news.publishDate}
          .unpublishDate=${this.news.unpublishDate}
          @request-date-change=${({detail: {publishDate, unpublishDate}}) => {
            this.dispatchEvent(new CustomEvent('request-change', {
              detail: {
                field: HgNewsEditFields.DATE,
                value: {publishDate, unpublishDate},
              },
            }));
          }}>
        </hg-news-edit-date>
        <hg-news-promote-switch
          .news=${this.news}
          .promotedDynamicPathPage=${this.promotedDynamicPathPage}
          @promoted-changed=${({detail: promoted}) => {
            this.dispatchEvent(new CustomEvent('request-change', {
              detail: {
                field: HgNewsEditFields.PROMOTED,
                value: promoted,
              },
            }));
            this._closeAllSnackbars();
            if (promoted) {
              this.shadowRoot.getElementById('snackbar-promote-true').show();
            } else {
              this.shadowRoot.getElementById('snackbar-promote-false').show();
            }
          }}>
        </hg-news-promote-switch>
      </div>
      <mwc-snackbar
        id="snackbar-promote-true"
        .leading=${true}
        .labelText=${'Zapisano. Promowana aktualność będzie widoczna w głównym menu nawigacji po odświeżeniu strony.'}>
      </mwc-snackbar>
      <mwc-snackbar
        id="snackbar-promote-false"
        .leading=${true}
        .labelText=${'Zapisano. Aktualność przestała być promowana. Zmiany będą widoczne po odświeżeniu strony.'}>
      </mwc-snackbar>
    `;
  }
}
customElements.define('hg-news-edit', HgNewsEdit);
