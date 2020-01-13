import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js'
import '../../content/hg-icons.js'
import '../../content/hg-mosaic.js'
import '../../content/hg-content-slider.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-menu.js'
import '../../content/hg-links.js';

customElements.define('hg-restaurant', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'restaurant'}></hg-intro-article>
      <hg-icons .uid=${'restaurant'}></hg-icons>
      <hg-mosaic .uid=${'restaurant'} .buttons=${staticProp({primary: [{url: '#menu', text: 'Zobacz menu'}]})}></hg-mosaic>
      <hg-content-slider .uid=${'restaurant'}></hg-content-slider>
      <hg-reviews-block .uid=${'restaurant'}></hg-reviews-block>
      <hg-menu id="menu" .uid=${'restaurant'}></hg-menu> 
      <hg-links .path=${'/restaurant'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
