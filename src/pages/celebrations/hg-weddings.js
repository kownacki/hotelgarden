import {LitElement, html, css} from 'lit-element';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-quote.js';
import '../../content/hg-icons.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-text-image.js';
import '../../content/hg-halls-block.js';
import '../../content/hg-links.js';

customElements.define('hg-weddings', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'weddings'}></hg-intro-article>
      <hg-quote .uid=${'weddings'}></hg-quote>
      <hg-icons .uid=${'weddings'}></hg-icons>
      <hg-content-slider .uid=${'weddings'}></hg-content-slider>
      <hg-mosaic .uid=${'weddings'}}></hg-mosaic>
      <hg-reviews-block uid=${'weddings'}></hg-reviews-block>
      <hg-text-image swap .uid=${'weddings'}}></hg-text-image>
      <hg-content-slider .uid=${'weddings-2'}></hg-content-slider>
      <hg-halls-block .uid=${'weddings'}></hg-halls-block>
      <hg-links .path=${'/wesela'} .superpath=${'/wesela'}></hg-links>
    `;
  }
});
