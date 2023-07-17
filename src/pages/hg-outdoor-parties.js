import {LitElement, html} from 'lit';
import {pagesStaticData} from '../../utils/urlStructure.js';
import '../content/hg-contact-block.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-hall.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';

export class HgOutdoorParties extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  _getHallsTemplate() {
    return html`
      <h2 class="content-heading">Wybierz miejsce</h2>
      ${['hall-outdoor-1', 'hall-outdoor-2', 'hall-outdoor-3', 'hall-outdoor-4']
        .map((uid, index) => {
          return html`
            <hg-hall id="${index + 1}" .uid=${uid} .areSetOutsHidden=${true}></hg-hall>
          `;
      })}
    `;
  }
  render() {
    const outdoorPartiesUid = 'outdoor-parties';

    return html`
      <hg-content>
        <hg-content-icons .uid=${outdoorPartiesUid}></hg-content-icons>
        <hg-mosaic .uid=${outdoorPartiesUid} .buttons=${staticProp({
          primary: [{url: '#kontakt', text: 'Skontaktuj się z nami'}],
        })}></hg-mosaic>
        <hg-content-slider .uid=${outdoorPartiesUid}></hg-content-slider>
        <hg-text-image .uid=${outdoorPartiesUid}></hg-text-image>
        ${this._getHallsTemplate()}
        <hg-contact-block id="kontakt"></hg-contact-block>
        <hg-links .path=${pagesStaticData[outdoorPartiesUid].path} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-outdoor-parties', HgOutdoorParties);
