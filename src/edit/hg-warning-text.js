import {LitElement, html, css} from 'lit';
import '@material/mwc-icon';
import sharedStyles from '../styles/shared-styles.js';

export class HgWarningText extends LitElement {
  static properties = {
    text: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: flex;
      color: var(--error-color);
      padding: 10px !important;
      background: var(--error-background-color);
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
      <mwc-icon>warning</mwc-icon>
      <div class="text">
        ${this.text}
      </div>
    `;
  }
}
customElements.define('hg-warning-text', HgWarningText);
