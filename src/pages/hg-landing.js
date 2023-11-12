import {LitElement, html} from 'lit';
import {staticProp} from '../utils.js';
import '../elements/hg-content.js';
import '../content/hg-quote.js';
import '../content/hg-content-icons.js';
import '../content/hg-text-image.js';
import '../content/hg-mosaic.js';
import '../content/hg-events-block.js';
import '../content/hg-content-slider.js';
import '../content/hg-reviews-block.js';
import '../content/hg-infographic.js';
import '../content/hg-map/hg-map-hotel-garden.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgLanding extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const landingPageUid = 'landing';

    return html`
      <hg-content>
        <hg-quote .uid=${landingPageUid}></hg-quote>
        <hg-content-icons .uid=${landingPageUid}></hg-content-icons>
        <hg-text-image .swap=${true} .uid=${landingPageUid} .buttons=${staticProp([{url: '/pokoje', text: 'Zobacz pokoje / Rezerwuj online'}])}></hg-text-image>
        <hg-mosaic .uid=${landingPageUid} .buttons=${staticProp({
          primary: [{url: '/wesela', text: 'Zobacz ofertę'}],
          secondary: [{url: '/sale-bankietowe', text: 'Zobacz sale'}],
        })}></hg-mosaic>
        <hg-content-slider .uid=${landingPageUid}></hg-content-slider>
        <hg-reviews-block .uid=${landingPageUid} .scores=${true} .bookingScores=${_.get('bookingScores', this.config)}></hg-reviews-block>
        <hg-infographic .uid=${landingPageUid}></hg-infographic>
        <hg-events-block></hg-events-block>
        <hg-map-hotel-garden class="no-animation"></hg-map-hotel-garden>
      </hg-content>
    `;
  }
}
customElements.define('hg-landing', HgLanding);
