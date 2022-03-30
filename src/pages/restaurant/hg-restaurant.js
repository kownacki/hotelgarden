import {LitElement, html, css} from 'lit';
import HgContent from "../../elements/hg-content";
import {staticProp} from '../../utils.js';
import '../../content/hg-article.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-contact-block.js';
import '../../content/hg-content-icons.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-menu.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-links.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-text-image.js';

export class HgRestaurant extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'grill-garden'}></hg-intro-article>
      <hg-content-icons .uid=${'grill-garden'}></hg-content-icons>
      <hg-text-image .uid=${'lunch'} .buttons=${staticProp([{url: '/lunch#aktualny-lunch', text: 'Przejdź do lunchy'}])}></hg-text-image>
      <h2 class="content-heading" id="menu">Menu</h2>
      <hg-menu .uid=${'grill-garden'}></hg-menu>
      <hg-content-slider .uid=${'grill-garden'}></hg-content-slider>
      <hg-article .rich=${true} .uid=${'grill-garden-extra1'}></hg-article>
      <hg-mosaic .uid=${'grill-garden'}></hg-mosaic>
      <hg-reviews-block .uid=${'grill-garden'}></hg-reviews-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/garden-bistro'} .superpath=${'/garden-bistro'}></hg-links>
    `;
  }
}
customElements.define('hg-restaurant', HgRestaurant);
