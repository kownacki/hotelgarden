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
import '../content/hg-map.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgLanding extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <hg-content>
        <hg-quote .uid=${'landing'}></hg-quote>
        <hg-content-icons .uid=${'landing'}></hg-content-icons>
        <hg-text-image .swap=${true} .uid=${'landing'} .buttons=${staticProp([{url: '/pokoje', text: 'Zobacz pokoje / Rezerwuj online'}])}></hg-text-image>
        <hg-mosaic .uid=${'landing'} .buttons=${staticProp({
          primary: [{url: '/wesela', text: 'Zobacz ofertę'}],
          secondary: [{url: '/sale-bankietowe', text: 'Zobacz sale'}],
        })}></hg-mosaic>
        <hg-content-slider .uid=${'landing'}></hg-content-slider>
        <hg-reviews-block .uid=${'landing'} .scores=${true} .bookingScores=${_.get('bookingScores', this.config)}></hg-reviews-block>
        <hg-infographic .uid=${'landing'}></hg-infographic>
        <hg-events-block></hg-events-block>
      </hg-content>
      <hg-map></hg-map>
    `;
  }
}
customElements.define('hg-landing', HgLanding);
