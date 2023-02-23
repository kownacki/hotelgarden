import {html} from 'lit';
import {pagesStaticData} from '../../utils/urlStructure.js';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-content-icons.js';
import '../content/hg-content-slider.js';
import '../content/hg-links.js';
import '../content/hg-mosaic.js';
import '../content/hg-text-image.js';
import HgContent from '../elements/hg-content.js';
import {staticProp} from '../utils.js';

export class HgCuisine extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'cuisine'}></hg-intro-article>
      <hg-content-icons .uid=${'cuisine'}></hg-content-icons>
      <hg-content-slider .uid=${'cuisine'}></hg-content-slider>
      <hg-mosaic .uid=${'cuisine'} .buttons=${staticProp({primary: [{url: `${pagesStaticData.restaurant.path}#menu`, text: 'Zobacz menu'}]})}></hg-mosaic>
      <hg-text-image .uid=${'lunch'} .buttons=${staticProp([{url: '/lunch#aktualny-lunch', text: 'Przejdź do lunchy'}])}></hg-text-image>
      <hg-text-image .swap=${true} .uid=${'cuisine-extra1'}></hg-text-image>
      <hg-links .path=${'/kuchnia'} .superpath=${'/'}></hg-links>
    `;
  }
}
customElements.define('hg-cuisine', HgCuisine);
