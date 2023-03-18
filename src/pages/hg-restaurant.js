import {LitElement, html} from 'lit';
import '../content/hg-article.js';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-links.js';
import '../content/hg-menu.js';
import '../content/hg-mosaic.js';
import '../content/hg-reviews-block.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';

export class HgRestaurant extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const menuName = 'Menu Garden Bistro';

    return html`
      <hg-content>
        <hg-content-icons .uid=${'grill-garden'}></hg-content-icons>
        <hg-text-image .uid=${'lunch'} .buttons=${staticProp([{url: '/lunch#aktualny-lunch', text: 'Przejdź do lunchy'}])}></hg-text-image>
        <h2 class="content-heading" id="menu">${menuName}</h2>
        <hg-menu .uid=${'garden-bistro'} .menuName=${menuName}></hg-menu>
        <hg-content-slider .uid=${'grill-garden'}></hg-content-slider>
        <hg-article .rich=${true} .uid=${'grill-garden-extra1'}></hg-article>
        <hg-mosaic .uid=${'grill-garden'}></hg-mosaic>
        <hg-reviews-block .uid=${'grill-garden'}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .path=${'/garden-bistro'} .superpath=${'/garden-bistro'}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-restaurant', HgRestaurant);
