import {LitElement, html, css} from 'lit-element';
import '../../content/hg-article.js';
import '../../content/hg-icons.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-halls-block.js';

customElements.define('hg-conferences', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-article .uid=${'conferences'}></hg-article>
      <hg-icons .uid=${'conferences'}></hg-icons>
      <hg-content-slider .uid=${'conferences'}></hg-content-slider>
      <hg-mosaic .uid=${'conferences'} .buttons=${{
        primary: [{url: '#', text: 'Zobacz ofertę'}, {url: '#', text: 'Lorem ipsum'}],
        secondary: [{url: '#'}],
      }}></hg-mosaic>
      <hg-halls-block .uid=${'conferences'}></hg-halls-block>
      <hg-heading center>${'Nowoczesne wyposażenie'}</hg-heading>
      <hg-icons .uid=${'conferences-halls'}></hg-icons>
      <hg-heading center>${'Food & Beverages'}</hg-heading>
      <hg-article narrow .uid=${'conferences-cuisine'}></hg-article>
      <hg-content-slider .uid=${'conferences-cuisine'}></hg-content-slider>
    `;
  }
});
