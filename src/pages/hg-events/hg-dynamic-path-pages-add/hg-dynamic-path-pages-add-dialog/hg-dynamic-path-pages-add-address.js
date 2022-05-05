import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {EVENTS_ROOT_PATH, ROOT_URL} from '../../../../../utils/urlStructure.js';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddAddress extends LitElement {
  static properties = {
    address: String,
    addressTaken: Boolean,
    showAddressInfo: Boolean,
    showLoading: Boolean,
  };
  static styles = [sharedStyles, css`
    .address {
      overflow-wrap: anywhere;
    }
    .address-url {
      font-family: monospace;
    }
    .address-info {
      min-height: 1.5em;
    }
  `];
  render() {
    return html`
      <p class="address">
        Adres: <span class="address-url">${ROOT_URL}${EVENTS_ROOT_PATH}${this.address || '...'}</span>
      </p>
      <p class="address-info">
        ${when(
          this.showLoading,
          () => html`Ładowanie...`,
        )}
        ${when(
          this.showAddressInfo,
          () => when(
            this.addressTaken,
            () => html`Adres wydarzenia <span style="color: red">zajęty</span>`,
            () => html`Adres wydarzenia <span style="color: green">dostępny</span>`,
          )
        )}
      </p>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-address', HgDynamicPathPagesAddAddress);
