import {LitElement, html} from 'lit';
import {pagesStaticData} from '../../utils/urlStructure.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';

export class HgCuisine extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    const cuisinePageUid = 'cuisine';

    return html`
      <hg-content>
        <hg-content-icons .uid=${cuisinePageUid}></hg-content-icons>
        <hg-content-slider .uid=${cuisinePageUid}></hg-content-slider>
        <hg-mosaic .uid=${cuisinePageUid} .buttons=${staticProp({primary: [{url: `${pagesStaticData.restaurant.path}#menu`, text: 'Zobacz menu'}]})}></hg-mosaic>
        <hg-text-image .uid=${'lunch'} .buttons=${staticProp([{url: '/lunch#aktualny-lunch', text: 'Przejdź do lunchy'}])}></hg-text-image>
        <hg-text-image .swap=${true} .uid=${'cuisine-extra1'}></hg-text-image>
        <hg-links .pageUid=${cuisinePageUid} .excludedPages=${staticProp(['careers'])}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-cuisine', HgCuisine);
