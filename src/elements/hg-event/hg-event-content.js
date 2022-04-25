import {LitElement, html, css} from 'lit';
import '../../edit/hg-editable-text.js';
import ckContent from '../../styles/ck-content.js'
import sharedStyles from '../../styles/shared-styles.js';

export class HgEventContent extends LitElement {
  static properties = {
    content: String,
  };
  static styles = [sharedStyles, ckContent, css`
  `];
  render() {
    return html`
      <hg-editable-text
        .multiline=${true}
        .ready=${true}
        .rich=${true}
        .text=${this.content}
        @save=${({detail: text}) => {
          this.dispatchEvent(new CustomEvent('content-changed', {detail: text}));
        }}>
        <div class="ck-content smaller-text"></div>
      </hg-editable-text>
    `;
  }
}
customElements.define('hg-event-content', HgEventContent);
