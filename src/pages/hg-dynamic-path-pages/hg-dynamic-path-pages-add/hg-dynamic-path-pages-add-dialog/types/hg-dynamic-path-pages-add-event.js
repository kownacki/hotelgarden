import {LitElement, html, css} from 'lit';
import '../../../../../edit/hg-info-text.js';
import sharedStyles from '../../../../../styles/shared-styles.js';
import {staticProp} from '../../../../../utils.js';
import '../hg-dynamic-path-pages-add-address.js';
import '../hg-dynamic-path-pages-add-date.js';
import '../hg-dynamic-path-pages-add-name.js';
import '../hg-dynamic-path-pages-add-permalink-warning.js';
import '../hg-dynamic-path-pages-add-heading.js';

export class HgDynamicPathPagesAddEvent extends LitElement {
  static properties = {
    address: String,
    addressTaken: Boolean,
    dateCorrect: Boolean,
    typing: Boolean,
    loading: Boolean,
    // observables
    date: Object, // {startDate: string, endDate?: string}
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
      <hg-dynamic-path-pages-add-heading>
        Wybierz nazwę wydarzenia
      </hg-dynamic-path-pages-add-heading>
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
      <div class="smaller-text">
        <hg-dynamic-path-pages-add-address
          .address=${this.address}
          .addressTaken=${this.addressTaken}
          .showLoading=${this.loading}
          .showAddressInfo=${this.address && !this.typing && !this.loading}>
        </hg-dynamic-path-pages-add-address>
      </div>
      <div class="divider"></div>
      <hg-dynamic-path-pages-add-heading>
        Wybierz datę wydarzenia
      </hg-dynamic-path-pages-add-heading>
      <hg-dynamic-path-pages-add-date
        .dateCorrect=${this.dateCorrect}
        .labels=${staticProp({
          singleDay: {
            switch: 'Jednodniowe wydarzenie',
            startDate: 'Data wydarzenia',
            error: 'Data nie może być miniona',
          },
          multipleDays: {
            switch: 'Wielodniowe wydarzenie',
            startDate: 'Data rozpoczęcia wydarzenia',
            endDate: 'Data zakończenia wydarzenia',
            error: 'Data zakończenia wydarzenia nie może być miniona. Data zakończenia musi następować po dacie rozpoczęcia.',
          },
        })}
        @date-changed=${({detail: date}) => {
          this.date = date;
          this.dispatchEvent(new CustomEvent('date-changed', {detail: this.date}));
        }}>
      </hg-dynamic-path-pages-add-date>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-event', HgDynamicPathPagesAddEvent);
