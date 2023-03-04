import {LitElement, html} from 'lit';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-reviews-block.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgCatering extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <hg-content>
        <hg-content-icons .uid=${'catering'}></hg-content-icons>
        <hg-mosaic .uid=${'catering'}></hg-mosaic>
        <hg-content-slider .uid=${'catering'}></hg-content-slider>
        <hg-reviews-block .uid=${'catering'}></hg-reviews-block>
        <hg-contact-block></hg-contact-block>
        <hg-links .path=${'/catering'} .superpath=${'/kuchnia'}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-catering', HgCatering);
