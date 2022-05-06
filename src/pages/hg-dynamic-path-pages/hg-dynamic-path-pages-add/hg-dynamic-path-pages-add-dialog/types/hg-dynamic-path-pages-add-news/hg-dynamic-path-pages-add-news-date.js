import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../../../../styles/shared-styles.js';
import '../../../../../../elements/hg-news-date-picker.js';

export class HgDynamicPathPagesAddNewsDate extends LitElement {
  static properties = {
    dateCorrect: Boolean,
  };
  static styles = [sharedStyles, css`
  `];
  render() {
    return html`
      <hg-news-date-picker
        .dateCorrect=${this.dateCorrect}
        @date-changed=${({detail: date}) => {
          this.dispatchEvent(new CustomEvent('date-changed', {detail: date}));
        }}>
      </hg-news-date-picker>
    `;
  }
}
customElements.define('hg-dynamic-path-pages-add-news-date', HgDynamicPathPagesAddNewsDate);
