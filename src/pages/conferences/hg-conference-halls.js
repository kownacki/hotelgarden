import {LitElement, html, css} from 'lit';
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-hall.js';

customElements.define('hg-conference-halls', class extends HgContent {
  render() {
    return html`
      <hg-intro-article .uid=${'halls'}></hg-intro-article>
      ${_.map.convert({cap: false})((uid, index) => html`
        <hg-hall id="${index + 1}" .uid=${uid}></hg-hall>
      `, ['hall-conference-1', 'hall-conference-2', 'hall-conference-3', 'hall-conference-4'])}
    `;
  }
});
