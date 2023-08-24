import {LitElement, html} from 'lit';
import '../content/hg-article.js';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-halls-block.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';

export class HgConferences extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const conferencesPageUid = 'conferences';

    return html`
      <hg-content>
        <hg-content-icons .uid=${conferencesPageUid}></hg-content-icons>
        <hg-content-slider .uid=${conferencesPageUid}></hg-content-slider>
        <hg-text-image .uid=${conferencesPageUid} .buttons=${staticProp([{url: '#kontakt', text: 'Skontaktuj się z nami'}])}></hg-text-image>
        <hg-halls-block .uid=${conferencesPageUid} .type=${'conference'}></hg-halls-block>
        <h2 class="content-heading">Food & Beverages</h2>
        <hg-article .rich=${true} .richConfig=${'mosaic'} .uid=${'conferences-cuisine'}></hg-article>
        <hg-content-slider .uid=${'conferences-cuisine'}></hg-content-slider>
        <hg-contact-block id="kontakt"></hg-contact-block>
      </hg-content>
    `;
  }
}
customElements.define('hg-conferences', HgConferences);
