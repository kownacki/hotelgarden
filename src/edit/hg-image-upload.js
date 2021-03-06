import {LitElement, html, css} from 'lit-element';
import {sleep} from "../utils";

customElements.define('hg-image-upload', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
      :host {
        display: none;
      }
    `;
  }
  async upload() {
    return new Promise((resolve) => {
      const input = this.shadowRoot.getElementById('input');
      document.body.onfocus = async () => {
        // todo Wait for file to load. 1 sec should be enough
        await sleep(1000);
        if (input.files.length) {
          const file = input.files[0];
          input.value = '';
          resolve(file);
        } else {
          resolve(false);
        }
      };
      this.shadowRoot.getElementById('input').click();
    })
  }
  render() {
    return html`
      <input id="input" type="file" accept="image/png, image/jpeg">
    `;
  }
});
