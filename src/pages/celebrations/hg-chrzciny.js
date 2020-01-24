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

customElements.define('hg-chrzciny', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'chrzciny'}></hg-intro-article>
      <hg-quote .uid=${'chrzciny'}></hg-quote>
      <hg-icons .uid=${'chrzciny'}></hg-icons>
      <hg-content-slider .uid=${'chrzciny'}></hg-content-slider>
      <hg-mosaic .uid=${'chrzciny'}></hg-mosaic>
      <hg-reviews-block uid=${'chrzciny'}></hg-reviews-block>
      <hg-text-image swap .uid=${'chrzciny'}></hg-text-image>
      <hg-halls-block .uid=${'chrzciny'}></hg-halls-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/chrzciny'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
    `;
  }
});
