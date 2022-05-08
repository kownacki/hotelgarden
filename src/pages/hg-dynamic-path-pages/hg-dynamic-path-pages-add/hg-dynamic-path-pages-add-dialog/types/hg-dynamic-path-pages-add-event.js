import {LitElement, html, css} from 'lit';
import '../../../../../edit/hg-info-text.js';
import sharedStyles from '../../../../../styles/shared-styles.js';
import '../hg-dynamic-path-pages-add-address.js';
import '../hg-dynamic-path-pages-add-dialog-subheading.js';
import '../hg-dynamic-path-pages-add-name.js';
import '../hg-dynamic-path-pages-add-permalink-warning.js';
import './hg-dynamic-path-pages-add-event/hg-dynamic-path-pages-add-event-date.js';

export class HgDynamicPathPagesAddEvent extends LitElement {
  static properties = {
    address: String,
    addressTaken: Boolean,
    dateCorrect: Boolean,
    typing: Boolean,
    loading: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-info-text {
      margin-bottom: 10px;
    }
    hg-dynamic-path-pages-add-permalink-warning {
      margin-bottom: 20px;
    }
    mwc-formfield-fixed {
      margin-bottom: 20px;
    }
  `];
  render() {
    return html`
      <hg-dynamic-path-pages-add-dialog-subheading>
        Wybierz nazwę wydarzenia
      </hg-dynamic-path-pages-add-dialog-subheading>
      <hg-info-text
        .text=${'Gdy dodajesz cykliczne wydarzenie, umieść w nazwie rok lub edycję wydarzenia. Np "Sylwester 2020", "Open Mic vol. V". Dzięki temu unikniesz konfliktu adresów URL, a twoje wydarzenie będzie łatwiej znaleźć.'}>
      </hg-info-text>
      <hg-dynamic-path-pages-add-permalink-warning></hg-dynamic-path-pages-add-permalink-warning>
      <hg-dynamic-path-pages-add-name
        .label=${'Nazwa wydarzenia'}
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
      <hg-dynamic-path-pages-add-dialog-subheading>
        Wybierz datę wydarzenia
      </hg-dynamic-path-pages-add-dialog-subheading>
      <hg-dynamic-path-pages-add-event-date
        .dateCorrect=${this.dateCorrect}
        @date-changed=${({detail: date}) => {
          this.dispatchEvent(new CustomEvent('date-changed', {detail: date}));
        }}>
      </hg-dynamic-path-pages-add-event-date>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-event', HgDynamicPathPagesAddEvent);
