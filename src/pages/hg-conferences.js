import {LitElement, html, css} from 'lit';
import {staticProp} from '../utils.js';
import HgContent from '../elements/hg-content.js';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-text-image.js';
import '../content/hg-halls-block.js';
import '../content/hg-article.js';
import '../content/hg-contact-block.js';

export class HgConferences extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'conferences'}></hg-intro-article>
      <hg-content-icons .uid=${'conferences'}></hg-content-icons>
      <hg-content-slider .uid=${'conferences'}></hg-content-slider>
      <hg-text-image .uid=${'conferences'} .buttons=${staticProp([{url: '#kontakt', text: 'Skontaktuj się z nami'}])}></hg-text-image>
      <hg-halls-block .uid=${'conferences'} .type=${'conference'}></hg-halls-block>
      <h2 class="content-heading">Food & Beverages</h2>
      <hg-article .rich=${true} .richConfig=${'mosaic'} .uid=${'conferences-cuisine'}></hg-article>
      <hg-content-slider .uid=${'conferences-cuisine'}></hg-content-slider>
      <hg-contact-block id="kontakt"></hg-contact-block>
    `;
  }
}
customElements.define('hg-conferences', HgConferences);
