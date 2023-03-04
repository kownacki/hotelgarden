import {LitElement, html, css} from 'lit';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-halls-block.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-quote.js';
import '../content/hg-reviews-block.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';

export class HgFamilyParties extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = [sharedStyles, sharedStyles, css`
    :host {
      display: block;
    }
    .occasion hg-text-image {
      margin-bottom: 40px;
    }
    .occasion hg-content-icons {
      margin-bottom: 60px;
    }
  `];
  render() {
    return html`
      <hg-content>
        ${_.map((type) => html`
          <div class="occasion divider">
            <hg-text-image
              .uid=${'family-parties-' + type}
              .buttons=${staticProp([{url: '#kontakt', text: 'Skontaktuj się z nami'}])}>
            </hg-text-image>
            <hg-content-icons .small=${true} .uid=${'family-parties-' + type}></hg-content-icons>
          </div>
        `, ['chrzciny', 'komunie', 'funerals'])}
        <hg-halls-block .uid=${'family-parties'} .type=${'banquet'}></hg-halls-block>
        <hg-reviews-block uid=${'family-parties'}></hg-reviews-block>
        <hg-contact-block id="kontakt"></hg-contact-block>
        <hg-links .path=${'/przyjecia-rodzinne'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-family-parties', HgFamilyParties);
