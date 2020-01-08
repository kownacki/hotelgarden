import {LitElement, html, css} from 'lit-element';

customElements.define('hg-gallery-upload', class extends LitElement {
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
      this.shadowRoot.getElementById('input').addEventListener('change', (event) => {
        const file = event.target.files[0];
        event.target.value = '';
        resolve(file);
      }, {once: true});
      this.shadowRoot.getElementById('input').click();
    })
  }
  render() {
    return html`
      <input id="input" type="file" accept="image/png, image/jpeg">
    `;
  }
});
