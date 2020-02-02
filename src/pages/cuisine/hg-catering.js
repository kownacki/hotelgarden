import {LitElement, html, css} from 'lit-element';
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js'
import '../../content/hg-content-icons.js';
import '../../content/hg-mosaic.js'
import '../../content/hg-content-slider.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-contact-block.js';
import '../../content/hg-links.js';

customElements.define('hg-catering', class extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'catering'}></hg-intro-article>
      <hg-content-icons .uid=${'catering'}></hg-content-icons>
      <hg-mosaic .uid=${'catering'}></hg-mosaic>
      <hg-content-slider .uid=${'catering'}></hg-content-slider>
      <hg-reviews-block .uid=${'catering'}></hg-reviews-block>
      <hg-contact-block></hg-contact-block>
      <hg-links .path=${'/catering'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
