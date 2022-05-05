import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../styles/shared-styles.js';
import './hg-dynamic-path-pages-add-tip.js';

export class HgDynamicPathPagesAddNews extends LitElement {
  static properties = {
    date: String,
  };
  static styles = [sharedStyles, css`
  `];
  render() {
    return html`
      <hg-dynamic-path-pages-add-tip>
        <p>
          <span style="color: var(--primary-color)">Podpowiedź:</span>
          Gdy dodajesz cykliczne wydarzenie, umieść w nazwie rok lub edycję wydarzenia. Np "Sylwester 2020",
          "Open Mic vol. V". Dzięki temu unikniesz konfliktu nazw, a twoje wydarzenie będzie łatwiej znaleźć.
        </p>
        <p>
          <span style="color: var(--error-color)">Uwaga:</span> Zmiana nazwy wydarzenia po utworzeniu NIE będzie skutkować zmianą adresu URL.
        </p>
      </hg-dynamic-path-pages-add-tip>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-news', HgDynamicPathPagesAddNews);
