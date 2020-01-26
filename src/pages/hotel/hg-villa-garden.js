import {LitElement, html, css} from 'lit-element';
import {staticProp, openProfitroom} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-links.js';

customElements.define('hg-villa-garden', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
      :host {
      }
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'villa-garden'}></hg-intro-article>
      <hg-text-image .uid=${'villa-garden'} .buttons=${[
        {click: () => openProfitroom('villa'), text: 'Rezerwuj'},
        {url: '/pokoje', text: 'Zobacz wszystkie pokoje'},
      ]}></hg-text-image>
      <hg-links .path=${'/villa-garden'} .superpath=${'/'}></hg-links>
    `;
  }
});
