import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';
import '../content/hg-article.js';
import '../content/hg-icons/hg-icons.js';
import '../content/hg-mosaic.js';
import '../content/hg-links.js';

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
      <hg-banner
        .src=${'/resources/images/villa.jpg'}
        .uid=${'villa-garden'}>
      </hg-banner>
      <hg-article .uid=${'villa-garden'}></hg-article>
      <hg-icons .uid=${'villa-garden'}></hg-icons>
      <hg-mosaic .uid=${'villa-garden'}></hg-mosaic>
      <hg-links .path=${'/villa-garden'} .superpath=${'/'}></hg-links>
    `;
  }
});
