import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-content-slider';
import '../../content/hg-text-image.js';
import '../../content/hg-icons.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-menu.js'
import '../../content/hg-links.js';

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
      <hg-intro-article .uid=${'surroundings'}></hg-intro-article>
      <hg-content-slider .uid=${'surroundings'}></hg-content-slider>
      <hg-text-image .uid=${'surroundings'} .buttons=${staticProp([{url: '/grill-garden'}])}></hg-text-image>
      <hg-links .path=${'/olesnica-i-okolice'} .superpath=${'/'}></hg-links>
    `;
  }
});
