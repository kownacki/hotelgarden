import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js'
import '../../content/hg-content-icons.js';
import '../../content/hg-article.js'
import '../../content/hg-mosaic.js'
import '../../content/hg-content-slider.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-text-image.js';
import '../../content/hg-contact-block.js';
import '../../content/hg-links.js';

customElements.define('hg-grill-garden', class extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'grill-garden'}></hg-intro-article>
      <hg-content-icons .uid=${'grill-garden'}></hg-content-icons>
      <hg-article .rich=${true} .uid=${'grill-garden-extra1'}></hg-article>
      <hg-mosaic .uid=${'grill-garden'}></hg-mosaic>
      <hg-content-slider .uid=${'grill-garden'}></hg-content-slider>
      <hg-reviews-block .uid=${'grill-garden'}></hg-reviews-block>
      <hg-text-image .swap=${true} .uid=${'grill-garden'}></hg-text-image>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/grill-garden'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
