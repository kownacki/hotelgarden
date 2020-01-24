import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-quote.js';
import '../../content/hg-icons.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-text-image.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-infographic.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-links.js';
import '../../content/hg-map.js';

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
      <hg-intro-article .uid=${'landing'}></hg-intro-article>
      <hg-quote .uid=${'landing'}></hg-quote>
      <hg-icons .uid=${'landing'}></hg-icons>
      <hg-text-image .swap=${true} .uid=${'landing'} .buttons=${staticProp([{url: '/pokoje', text: 'Zobacz pokoje'}])}></hg-text-image>
      <hg-mosaic .uid=${'landing'} .buttons=${staticProp({
        primary: [{url: '/wesela', text: 'Zobacz ofertę'}],
        secondary: [{url: '/sale', text: 'Zobacz sale'}],
      })}></hg-mosaic>
      <hg-content-slider .uid=${'landing'}></hg-content-slider>
      <hg-reviews-block .uid=${'landing'} scores></hg-reviews-block>
      <hg-infographic .uid=${'landing'}></hg-infographic>
      <hg-map></hg-map>
    `;
  }
});
