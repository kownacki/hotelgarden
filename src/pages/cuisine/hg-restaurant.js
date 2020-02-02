import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js'
import '../../content/hg-content-icons.js';
import '../../content/hg-mosaic.js'
import '../../content/hg-content-slider.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-article.js'
import '../../content/hg-menu.js'
import '../../content/hg-links.js';

customElements.define('hg-restaurant', class extends HgContent {
  static get styles() {
    return [super.styles, css`
      hg-menu {
        margin-top: 40px;
      }
    `];
  }
  render() {
    return html`
      <hg-intro-article .uid=${'restaurant'}></hg-intro-article>
      <hg-content-icons .uid=${'restaurant'}></hg-content-icons>
      <hg-mosaic .uid=${'restaurant'} .buttons=${staticProp({primary: [{url: '#menu', text: 'Zobacz menu'}]})}></hg-mosaic>
      <hg-content-slider .uid=${'restaurant'}></hg-content-slider>
      <hg-reviews-block .uid=${'restaurant'}></hg-reviews-block>
      <hg-article .rich=${true} .uid=${'restaurant-extra1'}></hg-article>
      <hg-menu id="menu" .uid=${'restaurant'}></hg-menu> 
      <hg-links .path=${'/restauracja'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
