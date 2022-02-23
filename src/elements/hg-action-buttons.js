import {LitElement, html, css} from 'lit';
import './hg-action-button.js';

export class HgActionButtons extends LitElement {
  static properties = {
    buttons: Array,
  };
  static get styles() {
    return css`
      :host {
        display: block;
        margin-right: -10px;
      }
      hg-action-button {
        margin-right: 10px;
        margin-bottom: 8px;
      }
    `;
  }
  render() {
    return html`
      ${_.map((button) => html`
        <hg-action-button .url=${button.url} @click=${button.click || null}>${button.text}</hg-action-button>
      `, this.buttons)}
    `;
  }
}
customElements.define('hg-action-buttons', HgActionButtons);
