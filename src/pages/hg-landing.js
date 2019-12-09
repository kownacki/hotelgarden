import {LitElement, html, css} from 'lit-element';
import '../hg-banner.js';
import '../content/hg-article.js';
import '../content/hg-quote.js';
import '../content/hg-icons/hg-icons.js';
import '../content/hg-mosaic.js';
import '../content/hg-text-image.js';
import '../content/hg-opinions-block/hg-opinions-block.js';
import '../content/hg-infographic.js';
import '../content/hg-content-slider/hg-content-slider.js';
import '../content/hg-links.js';

customElements.define('hg-landing', class extends LitElement {
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
      <hg-banner .uid=${'landing'}></hg-banner>
      <hg-article .uid=${'landing'}></hg-article>
      <hg-quote .uid=${'landing'}></hg-quote>
      <hg-icons .uid=${'landing'}></hg-icons>
      <hg-mosaic .uid=${'landing'}></hg-mosaic>
      <hg-text-image .uid=${'landing'}></hg-text-image>
      <hg-opinions-block></hg-opinions-block>
      <hg-infographic .uid=${'landing'}></hg-infographic>
      <hg-content-slider .uid=${'landing'}></hg-content-slider>
    `;
  }
});
