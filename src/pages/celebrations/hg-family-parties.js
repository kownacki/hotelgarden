import {LitElement, html, css} from 'lit';
import {staticProp} from '../../utils.js';
import sharedStyles from "../../styles/shared-styles.js";
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-quote.js';
import '../../content/hg-content-icons.js';
import '../../content/hg-content-slider.js';
import '../../content/hg-mosaic.js';
import '../../content/hg-text-image.js';
import '../../content/hg-halls-block.js';
import '../../content/hg-reviews-block.js';
import '../../content/hg-contact-block.js';
import '../../content/hg-links.js';

export class HgFamilyParties extends HgContent {
  static styles = [super.styles, sharedStyles, css`
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
      <hg-intro-article .uid=${'family-parties'}></hg-intro-article>
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
    `;
  }
}
customElements.define('hg-family-parties', HgFamilyParties);
