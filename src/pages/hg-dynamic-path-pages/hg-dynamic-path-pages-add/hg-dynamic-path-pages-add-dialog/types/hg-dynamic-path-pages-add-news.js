import {LitElement, html, css} from 'lit';
import '../../../../../edit/hg-info-text.js';
import sharedStyles from '../../../../../styles/shared-styles.js';
import '../hg-dynamic-path-pages-add-address.js';
import '../hg-dynamic-path-pages-add-name.js';
import '../hg-dynamic-path-pages-add-permalink-warning.js';
import '../hg-dynamic-path-pages-add-heading.js';
import './hg-dynamic-path-pages-add-news/hg-dynamic-path-pages-add-news-date.js';

export class HgDynamicPathPagesAddNews extends LitElement {
  static properties = {
    address: String,
    addressTaken: Boolean,
    dateCorrect: Boolean,
    typing: Boolean,
    loading: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-dynamic-path-pages-add-permalink-warning {
      margin-bottom: 20px;
    }
    mwc-formfield-fixed {
      margin-bottom: 20px;
    }
  `];
  render() {
    return html`
      <hg-dynamic-path-pages-add-heading>
        Wybierz nazwę aktualności
      </hg-dynamic-path-pages-add-heading>
      <hg-dynamic-path-pages-add-permalink-warning></hg-dynamic-path-pages-add-permalink-warning>
      <hg-dynamic-path-pages-add-name
        .label=${'Nazwa aktualności'}
        @name-changed=${({detail: name}) => {
          this.dispatchEvent(new CustomEvent('title-changed', {detail: name}));
        }}>
      </hg-dynamic-path-pages-add-name>
      <div>
        <hg-dynamic-path-pages-add-address
          .address=${this.address}
          .addressTaken=${this.addressTaken}
          .showLoading=${this.loading}
          .showAddressInfo=${this.address && !this.typing && !this.loading}>
        </hg-dynamic-path-pages-add-address>
      </div>
      <div class="divider"></div>
      <hg-dynamic-path-pages-add-heading>
        Wybierz datę publikacji aktualności
      </hg-dynamic-path-pages-add-heading>
      <hg-dynamic-path-pages-add-news-date
        .dateCorrect=${this.dateCorrect}
        @date-changed=${({detail: date}) => {
          this.dispatchEvent(new CustomEvent('date-changed', {detail: date}));
        }}>
      </hg-dynamic-path-pages-add-news-date>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-news', HgDynamicPathPagesAddNews);
