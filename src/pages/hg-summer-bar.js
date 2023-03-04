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

export class HgSummerBar extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <hg-content>
        <hg-content-icons .uid=${'summer-bar'}></hg-content-icons>
        <h2 class="content-heading" id="menu">Menu Summer Bar</h2>
        <hg-menu .uid=${'summer-bar'}></hg-menu>
        <hg-content-slider .uid=${'summer-bar'}></hg-content-slider>
        <hg-article .rich=${true} .uid=${'summer-bar-extra1'}></hg-article>
        <hg-mosaic .uid=${'summer-bar'}></hg-mosaic>
        <hg-reviews-block .uid=${'summer-bar'}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .path=${'/summer-bar'} .superpath=${'/garden-bistro'} .includeSuperpath=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-summer-bar', HgSummerBar);
