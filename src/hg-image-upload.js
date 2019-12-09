import {LitElement, html, css} from 'lit-element';

customElements.define('hg-image-upload', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
      input {
        display: none;
      }
      paper-button {
        margin: 2px;
      }
    `;
  }
  render() {
    return html`
      <input
        id="input"
        type="file"
        accept="image/png, image/jpeg"
        @change=${async (event) => {
          const file = event.target.files[0];
          event.target.value = '';
          this.dispatchEvent(new CustomEvent('upload', {detail: file}));
        }}>
      <paper-button
        raised
        @click=${() => this.shadowRoot.getElementById('input').click()}>
        Dodaj
      </paper-button>   
    `;
  }
});
