import {LitElement, html} from 'lit';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-hall.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgConferenceHalls extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <hg-intro-article .uid=${'conference-halls'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      <hg-content>
        ${_.map.convert({cap: false})((uid, index) => html`
        <hg-hall id="${index + 1}" .uid=${uid}></hg-hall>
      `, ['hall-conference-1', 'hall-conference-2', 'hall-conference-3', 'hall-conference-4'])}
      </hg-content>
    `;
  }
}
customElements.define('hg-conference-halls', HgConferenceHalls);
