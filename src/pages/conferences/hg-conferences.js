import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-content-icons.js';
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
      <hg-intro-article .uid=${'conferences'}></hg-intro-article>
      <hg-content-icons .uid=${'conferences'}></hg-content-icons>
      <hg-content-slider .uid=${'conferences'}></hg-content-slider>
      <hg-mosaic .uid=${'conferences'} .buttons=${staticProp({
        primary: [{url: '#', text: 'Zobacz ofertę'}, {url: '#', text: 'Lorem ipsum'}],
        secondary: [{url: '#', text: 'Zobacz ofertę'}],
      })}></hg-mosaic>
      <hg-halls-block .uid=${'conferences'}></hg-halls-block>
      <hg-heading center>${'Nowoczesne wyposażenie'}</hg-heading>
      <hg-content-icons .uid=${'conferences-halls'}></hg-content-icons>
      <hg-heading center>${'Food & Beverages'}</hg-heading>
      <hg-article .rich=${true} .richConfig=${'mosaic'} .uid=${'conferences-cuisine'}></hg-article>
      <hg-content-slider .uid=${'conferences-cuisine'}></hg-content-slider>
      <hg-contact-block></hg-contact-block>
    `;
  }
});
