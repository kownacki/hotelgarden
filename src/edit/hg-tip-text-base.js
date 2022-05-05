import {LitElement, html, css} from 'lit';
import '@material/mwc-icon';
import sharedStyles from '../styles/shared-styles.js';

export class HgTipTextBase extends LitElement {
  static properties = {
    icon: String,
    text: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: flex;
      padding: 10px !important;
    }
    mwc-icon {
      margin-right: 10px;
    }
    .text {
      margin-top: 3px;
    }
  `];
  render() {
    return html`
      <mwc-icon>${this.icon}</mwc-icon>
      <div class="text">
        ${this.text}
      </div>
    `;
  }
}
customElements.define('hg-tip-text-base', HgTipTextBase);
