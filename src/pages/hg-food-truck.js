import {html} from 'lit';
import '../content/hg-article.js';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-menu.js';
import '../content/hg-mosaic.js';
import '../content/hg-links.js';
import '../content/hg-reviews-block.js';
import HgContent from '../elements/hg-content.js';

export class HgFoodTruck extends HgContent {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  render() {
    return html`
      <hg-intro-article .uid=${'food-truck'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      <hg-content-icons .uid=${'food-truck'}></hg-content-icons>
      <h2 class="content-heading" id="menu">Menu Food Truck</h2>
      <hg-menu .uid=${'food-truck'}></hg-menu>
      <hg-content-slider .uid=${'food-truck'}></hg-content-slider>
      <hg-article .rich=${true} .uid=${'food-truck-extra1'}></hg-article>
      <hg-mosaic .uid=${'food-truck'}></hg-mosaic>
      <hg-reviews-block .uid=${'food-truck'}></hg-reviews-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/food-truck'} .superpath=${'/garden-bistro'} .includeSuperpath=${true}></hg-links>
    `;
  }
}
customElements.define('hg-food-truck', HgFoodTruck);
