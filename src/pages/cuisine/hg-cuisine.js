import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-content-icons.js';
import '../../content/hg-content-slider';
import '../../content/hg-mosaic.js';
import '../../content/hg-links.js';
import '../../content/hg-links.js';
import HgContent from "../../elements/hg-content";

customElements.define('hg-cuisine', class extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'cuisine'}></hg-intro-article>
      <hg-content-icons .uid=${'cuisine'}></hg-content-icons>
      <hg-content-slider></hg-content-slider>
      <hg-mosaic .uid=${'cuisine'} .buttons=${staticProp({primary: [{url: '/restauracja#menu', text: 'Zobacz menu'}]})}></hg-mosaic>
      <hg-text-image .uid=${'cuisine-extra1'} .buttons=${staticProp([{url: '#', text: 'Zobacz ofertę'}])}></hg-text-image>
      <hg-text-image swap .uid=${'landing-extra2'} .buttons=${staticProp([{url: '#', text: 'Zobacz ofertę'}])}></hg-text-image>
      <hg-links .path=${'/kuchnia'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
