import {LitElement, html} from 'lit';
import '../content/hg-article.js';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-links.js';
import '../content/hg-menu.js';
import '../content/hg-mosaic.js';
import '../content/hg-reviews-block.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgFoodTruck extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const menuName = 'Menu Food Truck';

    return html`
      <hg-content>
        <hg-content-icons .uid=${'food-truck'}></hg-content-icons>
        <h2 class="content-heading" id="menu">${menuName}</h2>
        <hg-menu .uid=${'food-truck'} .menuName=${menuName}></hg-menu>
        <hg-content-slider .uid=${'food-truck'}></hg-content-slider>
        <hg-article .rich=${true} .uid=${'food-truck-extra1'}></hg-article>
        <hg-mosaic .uid=${'food-truck'}></hg-mosaic>
        <hg-reviews-block .uid=${'food-truck'}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .path=${'/food-truck'} .superpath=${'/garden-bistro'} .includeSuperpath=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-food-truck', HgFoodTruck);
