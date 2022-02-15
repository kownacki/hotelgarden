import {LitElement, html, css} from 'lit';
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-hall.js';
import '../../content/hg-links.js';

export class HgBanquetHalls extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'banquet-halls'}></hg-intro-article>
      ${_.map.convert({cap: false})((uid, index) => html`
        <hg-hall id="${index + 1}" .uid=${uid}></hg-hall>
      `, ['hall-banquet-1', 'hall-banquet-2', 'hall-banquet-3', 'hall-banquet-4', 'hall-banquet-5'])}
      <hg-links .path=${'/sale-bankietowe'} .superpath=${'/wesela'} .includeSuperpath=${true}></hg-links>
    `;
  }
}
customElements.define('hg-banquet-halls', HgBanquetHalls);
