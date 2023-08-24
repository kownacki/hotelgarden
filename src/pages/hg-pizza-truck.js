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

export class HgPizzaTruck extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const pizzaTruckPageUid = 'pizza-truck';
    const menuName = 'Menu Pizza Truck';

    return html`
      <hg-content>
        <hg-content-icons .uid=${pizzaTruckPageUid}></hg-content-icons>
        <h2 class="content-heading" id="menu">${menuName}</h2>
        <hg-menu .uid=${pizzaTruckPageUid} .menuName=${menuName}></hg-menu>
        <hg-content-slider .uid=${pizzaTruckPageUid}></hg-content-slider>
        <hg-article .rich=${true} .uid=${'pizza-truck-extra1'}></hg-article>
        <hg-mosaic .uid=${pizzaTruckPageUid}></hg-mosaic>
        <hg-reviews-block .uid=${pizzaTruckPageUid}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .pageUid=${pizzaTruckPageUid} .isParentPageIncluded=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-pizza-truck', HgPizzaTruck);
