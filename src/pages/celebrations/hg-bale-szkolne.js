import {LitElement, html, css} from 'lit-element';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-quote.js';
import '../../content/hg-content-icons.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-text-image.js';
import '../../content/hg-halls-block.js';
import '../../content/hg-links.js';

customElements.define('hg-bale-szkolne', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'bale-szkolne'}></hg-intro-article>
      <hg-quote .uid=${'bale-szkolne'}></hg-quote>
      <hg-content-icons .uid=${'bale-szkolne'}></hg-content-icons>
      <hg-content-slider .uid=${'bale-szkolne'}></hg-content-slider>
      <hg-mosaic .uid=${'bale-szkolne'}></hg-mosaic>
      <hg-reviews-block uid=${'bale-szkolne'}></hg-reviews-block>
      <hg-text-image swap .uid=${'bale-szkolne'}></hg-text-image>
      <hg-halls-block .uid=${'bale-szkolne'}></hg-halls-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/bale-szkolne'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
    `;
  }
});
