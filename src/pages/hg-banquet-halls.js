import {LitElement, html} from 'lit';
import {pagesStaticData} from '../../utils/urlStructure.js';
import '../content/hg-hall.js';
import '../content/hg-links.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgBanquetHalls extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  _getHallsTemplate() {
    return ['hall-banquet-1', 'hall-banquet-2', 'hall-banquet-3', 'hall-banquet-4', 'hall-banquet-5']
      .map((uid, index) => {
        return html`
          <hg-hall id="${index + 1}" .uid=${uid}></hg-hall>
        `;
      });
  }
  render() {
    const banquetHallsPageUid = 'banquet-halls';

    return html`
      <hg-content>
        ${this._getHallsTemplate()}
        <hg-links .pageUid=${banquetHallsPageUid} .isParentPageIncluded=${true}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-banquet-halls', HgBanquetHalls);
