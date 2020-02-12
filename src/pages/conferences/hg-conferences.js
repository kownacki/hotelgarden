import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import HgContent from "../../elements/hg-content.js";
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-content-icons.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-halls-block.js';
import '../../elements/hg-heading.js';
import '../../content/hg-article.js';
import '../../content/hg-contact-block.js';

customElements.define('hg-conferences', class extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'conferences'}></hg-intro-article>
      <hg-content-icons .uid=${'conferences'}></hg-content-icons>
      <hg-content-slider .uid=${'conferences'}></hg-content-slider>
      <hg-mosaic .uid=${'conferences'} .buttons=${staticProp({
        primary: [{url: '#kontact', text: 'Skontaktuj się z nami'}],
      })}></hg-mosaic>
      <hg-halls-block .type=${'conference'}></hg-halls-block>
      <hg-heading center>${'Food & Beverages'}</hg-heading>
      <hg-article .rich=${true} .richConfig=${'mosaic'} .uid=${'conferences-cuisine'}></hg-article>
      <hg-content-slider .uid=${'conferences-cuisine'}></hg-content-slider>
      <hg-contact-block id="kontakt"></hg-contact-block>
    `;
  }
});
