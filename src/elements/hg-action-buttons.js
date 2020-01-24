import {LitElement, html, css} from 'lit-element';
import './hg-action-button.js';

customElements.define('hg-action-buttons', class extends LitElement {
  static get properties() {
    return {
      buttons: Array,
    };
  }
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
        <hg-action-button .url=${button.url} .click=${button.click}>${button.text}</hg-action-button>
      `, this.buttons)}
    `;
  }
});
