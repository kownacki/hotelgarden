import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import './hg-tip-text-base.js';

export class HgInfoText extends LitElement {
  static properties = {
    text: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      background: rgba(var(--secondary-light-color-rgb), 20%);
    }
  `];
  render() {
    return html`
      <hg-tip-text-base
        .icon=${'info'}
        .text=${this.text}>
      </hg-tip-text-base>
    `;
  }
}
customElements.define('hg-info-text', HgInfoText);
