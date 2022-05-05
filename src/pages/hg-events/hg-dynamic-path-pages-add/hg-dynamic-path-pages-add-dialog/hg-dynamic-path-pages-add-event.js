import {LitElement, html, css} from 'lit';
import '../../../../edit/hg-date-picker.js';
import sharedStyles from '../../../../styles/shared-styles.js';
import './hg-dynamic-path-pages-add-tip.js';

export class HgDynamicPathPagesAddEvent extends LitElement {
  static properties = {
    date: String,
  };
  static styles = [sharedStyles, css`
    .tip {
      background: rgba(var(--secondary-color-rgb), 20%);
      padding-top: 10px;
      padding-bottom: 10px;
    }
  `];
  render() {
    return html`
      <hg-dynamic-path-pages-add-tip>
        <p>
          <span style="color: var(--primary-color)">Podpowiedź:</span>
          Gdy dodajesz cykliczne wydarzenie, umieść w nazwie rok lub edycję wydarzenia. Np "Sylwester 2020",
          "Open Mic vol. V". Dzięki temu unikniesz konfliktu adresów URL, a twoje wydarzenie będzie łatwiej znaleźć.
        </p>
        <p>
          <span style="color: var(--error-color)">Uwaga:</span> Zmiana nazwy wydarzenia po utworzeniu NIE będzie skutkować zmianą adresu URL.
        </p>
      </hg-dynamic-path-pages-add-tip>
      <p class="smaller-text">
        Wybierz datę
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
