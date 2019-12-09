import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';
import '../content/hg-article.js';
import '../content/hg-content-slider/hg-content-slider';
import '../content/hg-text-image.js';

import '../content/hg-icons/hg-icons.js';
import '../content/hg-mosaic.js';
import '../content/hg-menu/hg-menu.js'
import '../content/hg-links.js';

customElements.define('hg-surroundings', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-banner .uid=${'surroundings'}></hg-banner>
      <hg-article .uid=${'surroundings'}></hg-article>
      <hg-content-slider .uid=${'surroundings'}></hg-content-slider>
      <hg-text-image .uid=${'surroundings'} .buttons=${[{url: '/grill-garden'}]}></hg-text-image>
      <hg-links .path=${'/olesnica-i-okolice'} .superpath=${'/'}></hg-links>
    `;
  }
});