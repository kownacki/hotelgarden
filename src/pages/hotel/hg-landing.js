import {LitElement, html, css} from 'lit-element';
import '../../content/hg-article.js';
import '../../content/hg-quote.js';
import '../../content/hg-icons.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-text-image.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-infographic.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-links.js';

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
      <hg-article .uid=${'landing'}></hg-article>
      <hg-quote .uid=${'landing'}></hg-quote>
      <hg-icons .uid=${'landing'}></hg-icons>
      <hg-mosaic .uid=${'landing'} .buttons=${{
        primary: [{url: '#', text: 'Zobacz ofertę'}, {url: '#', text: 'Lorem ipsum'}],
        secondary: [{url: '#'}],
      }}></hg-mosaic>
      <hg-text-image .uid=${'landing'} .buttons=${[{url: '#'}]}></hg-text-image>
      <hg-reviews-block .uid=${'landing'} scores></hg-reviews-block>
      <hg-infographic .uid=${'landing'}></hg-infographic>
      <hg-content-slider .uid=${'landing'}></hg-content-slider>
    `;
  }
});
