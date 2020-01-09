import {LitElement, html, css} from 'lit-element';
import '../edit/hg-image-upload.js';
import {createImage} from "../utils";

customElements.define('hg-image-upload-fab', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
      input {
        display: none;
      }
      paper-fab {
        position: absolute;
        bottom: 20px;
        right: 20px;
        margin: 2px;
        --paper-fab-keyboard-focus-background: var(--primary-color);
      }
    `;
  }
  render() {
    return html`
      <hg-image-upload id="upload"></hg-image-upload>
      <paper-fab
        icon="add" 
        @click=${async() => {
          this.dispatchEvent(new CustomEvent('upload', {detail: await this.shadowRoot.getElementById('upload').upload()}));
        }}>
      </paper-fab>
    `;
  }
});