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
    const summerBarPageUid = 'summer-bar';
    const menuName = 'Menu Summer Bar';

    return html`
      <hg-content>
        <hg-content-icons .uid=${summerBarPageUid}></hg-content-icons>
        <h2 class="content-heading" id="menu">${menuName}</h2>
        <hg-menu .uid=${summerBarPageUid} .menuName=${menuName}></hg-menu>
        <hg-content-slider .uid=${summerBarPageUid}></hg-content-slider>
        <hg-article .rich=${true} .uid=${'summer-bar-extra1'}></hg-article>
        <hg-mosaic .uid=${summerBarPageUid}></hg-mosaic>
        <hg-reviews-block .uid=${summerBarPageUid}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .pageUid=${summerBarPageUid} .isParentPageIncluded=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-summer-bar', HgSummerBar);
