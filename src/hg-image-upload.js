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
      <input
        id="input"
        type="file"
        accept="image/png, image/jpeg"
        @change=${async (event) => {
          const file = event.target.files[0];
          event.target.value = '';
          this.dispatchEvent(new CustomEvent('upload', {detail: file}));
        }}>
      <paper-fab icon="add" @click=${() => this.shadowRoot.getElementById('input').click()}></paper-fab>
    `;
  }
});
