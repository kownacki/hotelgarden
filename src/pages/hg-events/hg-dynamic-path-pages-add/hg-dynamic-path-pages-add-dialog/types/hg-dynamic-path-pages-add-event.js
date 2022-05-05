import {LitElement, html, css} from 'lit';
import '../../../../../edit/hg-info-text.js';
import '../../../../../edit/hg-warning-text.js';
import sharedStyles from '../../../../../styles/shared-styles.js';
import './hg-dynamic-path-pages-add-event/hg-dynamic-path-pages-add-event-date.js';

export class HgDynamicPathPagesAddEvent extends LitElement {
  static properties = {
    dateCorrect: Boolean,
    // observables
    date: Object, // {startDate: string, endDate?: string}
  };
  static styles = [sharedStyles, css`
    hg-info-text {
      margin-bottom: 10px;
    }
    mwc-formfield-fixed {
      margin-bottom: 20px;
    }
  `];
  render() {
    return html`
      <hg-info-text
        .text=${'Gdy dodajesz cykliczne wydarzenie, umieść w nazwie rok lub edycję wydarzenia. Np "Sylwester 2020", "Open Mic vol. V". Dzięki temu unikniesz konfliktu adresów URL, a twoje wydarzenie będzie łatwiej znaleźć.'}>
      </hg-info-text>
      <hg-warning-text
        .text=${'Zmiana nazwy wydarzenia po utworzeniu NIE będzie skutkować zmianą adresu URL.'}>
      </hg-warning-text>
      <hg-dynamic-path-pages-add-event-date
        .dateCorrect=${this.dateCorrect}
        @date-changed=${({detail: date}) => {
          this.date = date;
          this.dispatchEvent(new CustomEvent('date-changed', {detail: this.date}));
        }}>
      </hg-dynamic-path-pages-add-event-date>
      <div class="divider"></div>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-event', HgDynamicPathPagesAddEvent);
