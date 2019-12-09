import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';
import '../content/hg-article.js';
import '../content/hg-icons/hg-icons.js';
import '../content/hg-content-slider/hg-content-slider';
import '../content/hg-mosaic.js';
import '../content/hg-menu/hg-menu.js'
import '../content/hg-links.js';

customElements.define('hg-cuisine', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-banner
        .uid=${'cuisine'}
        .src=${'https://picsum.photos/id/75/1920/980'}>
      </hg-banner>
      <hg-article .uid=${'landing'}></hg-article>
      <hg-icons .uid=${'landing'}></hg-icons>
      <hg-content-slider></hg-content-slider>
      <hg-mosaic .uid=${'landing'}></hg-mosaic>
      <hg-menu></hg-menu> 
      <hg-links .path=${'/kuchnia'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
