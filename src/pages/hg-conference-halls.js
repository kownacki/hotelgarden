import {LitElement, html} from 'lit';
import '../content/hg-hall.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgConferenceHalls extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = sharedStyles;
  _getHallsTemplate() {
    return ['hall-conference-1', 'hall-conference-2', 'hall-conference-3', 'hall-conference-4']
      .map((uid, index) => {
        return html`
          <hg-hall id="${index + 1}" .uid=${uid}></hg-hall>
        `;
      });
  }
  render() {
    return html`
      <hg-content>
        ${this._getHallsTemplate()}
      </hg-content>
    `;
  }
}
customElements.define('hg-conference-halls', HgConferenceHalls);
