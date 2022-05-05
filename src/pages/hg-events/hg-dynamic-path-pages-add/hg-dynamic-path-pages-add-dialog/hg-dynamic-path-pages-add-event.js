import {LitElement, html, css} from 'lit';
import '../../../../edit/hg-date-picker.js';
import '../../../../edit/hg-info-text.js';
import '../../../../edit/hg-warning-text.js';
import sharedStyles from '../../../../styles/shared-styles.js';

export class HgDynamicPathPagesAddEvent extends LitElement {
  static properties = {
    date: String,
  };
  static styles = [sharedStyles, css`
    hg-info-text {
      margin-bottom: 10px;
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
      <p class="smaller-text">
        Wybierz datę wydarzenia
      </p>
      <hg-date-picker
        id="picker"
        @date-changed=${({detail: date}) => {
          this.date = date;
          this.dispatchEvent(new CustomEvent('date-changed', {detail: this.date}));
        }}>
      </hg-date-picker>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-event', HgDynamicPathPagesAddEvent);
