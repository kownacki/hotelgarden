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

customElements.define('hg-komunie', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'komunie'}></hg-intro-article>
      <hg-quote .uid=${'komunie'}></hg-quote>
      <hg-icons .uid=${'komunie'}></hg-icons>
      <hg-content-slider .uid=${'komunie'}></hg-content-slider>
      <hg-mosaic .uid=${'komunie'}}></hg-mosaic>
      <hg-reviews-block uid=${'komunie'}></hg-reviews-block>
      <hg-text-image swap .uid=${'komunie'}}></hg-text-image>
      <hg-halls-block .uid=${'komunie'}></hg-halls-block>
      <hg-links .path=${'/komunie'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
    `;
  }
});
