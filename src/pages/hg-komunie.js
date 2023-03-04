import {LitElement, html} from 'lit';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-halls-block.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-quote.js';
import '../content/hg-reviews-block.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgKomunie extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <hg-intro-article .uid=${'komunie'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      <hg-content>
        <hg-quote .uid=${'komunie'}></hg-quote>
        <hg-content-icons .uid=${'komunie'}></hg-content-icons>
        <hg-content-slider .uid=${'komunie'}></hg-content-slider>
        <hg-mosaic .uid=${'komunie'}></hg-mosaic>
        <hg-halls-block .uid=${'komunie'} .type=${'banquet'}></hg-halls-block>
        <hg-reviews-block uid=${'komunie'}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .path=${'/komunie'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-komunie', HgKomunie);
