import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../../../styles/shared-styles.js';
import '../../../../../../elements/hg-event-date-picker.js';

export class HgDynamicPathPagesAddEventDate extends LitElement {
  static properties = {
    dateCorrect: Boolean,
  };
  static styles = [sharedStyles, css`
  `];
  render() {
    return html`
      <hg-event-date-picker
        .dateCorrect=${this.dateCorrect}
        @date-changed=${({detail: date}) => {
          this.dispatchEvent(new CustomEvent('date-changed', {detail: date}));
        }}>
      </hg-event-date-picker>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-event-date', HgDynamicPathPagesAddEventDate);
