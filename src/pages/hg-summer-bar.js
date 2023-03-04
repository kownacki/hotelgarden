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

export class HgSummerBar extends HgContent {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  render() {
    return html`
      <hg-intro-article .uid=${'summer-bar'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      <hg-content-icons .uid=${'summer-bar'}></hg-content-icons>
      <h2 class="content-heading" id="menu">Menu Summer Bar</h2>
      <hg-menu .uid=${'summer-bar'}></hg-menu>
      <hg-content-slider .uid=${'summer-bar'}></hg-content-slider>
      <hg-article .rich=${true} .uid=${'summer-bar-extra1'}></hg-article>
      <hg-mosaic .uid=${'summer-bar'}></hg-mosaic>
      <hg-reviews-block .uid=${'summer-bar'}></hg-reviews-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/summer-bar'} .superpath=${'/garden-bistro'} .includeSuperpath=${true}></hg-links>
    `;
  }
}
customElements.define('hg-summer-bar', HgSummerBar);
