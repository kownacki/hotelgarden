import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';

export class HgCmsButtonsContainer extends LitElement {
  static properties = {
    alignToLeft: {type: Boolean, reflect: true, attribute: 'align-to-left'}
  };
  static styles = [sharedStyles, css`
    :host {
      --hg-cms-buttons-container-horizontal-spacing: 8px;
      --hg-cms-buttons-container-vertical-spacing: 6px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-bottom: calc(-1 * var(--hg-cms-buttons-container-vertical-spacing));
    }
    :host(:not([align-to-left])) {
      justify-content: flex-end;
    }
    :host([align-to-left]) {
      justify-content: flex-start;
    }
    ::slotted(*) {
      margin-bottom: var(--hg-cms-buttons-container-vertical-spacing);
    }
    :host(:not([align-to-left])) ::slotted(*) {
      margin-left: var(--hg-cms-buttons-container-horizontal-spacing);
    }
    :host([align-to-left]) ::slotted(*) {
      margin-right: var(--hg-cms-buttons-container-horizontal-spacing);
    }
  `];
  render() {
    return html`
      <slot></slot>
    `;
  }
}
customElements.define('hg-cms-buttons-container', HgCmsButtonsContainer);
