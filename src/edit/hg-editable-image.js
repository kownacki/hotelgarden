import {LitElement, html, css} from 'lit-element';

const readFile = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (event) => resolve(event.target.result);
  reader.readAsDataURL(file);
});

customElements.define('hg-editable-image', class extends LitElement {
  static get properties() {
    return {
      src: {
        type: Boolean,
        reflect: true,
        attribute: 'not-empty',
      },
      sizing: String,
      presize: {type: Boolean, reflect: true},
    };
  }
  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      :host(:not([not-empty])) {
        background: rgba(var(--placeholder-color-rgb), 0.5);
      }
      :host([presize]:not([not-empty])) {
        height: 250px;
      }
      iron-image {
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
      }
      :host([lower-image]) iron-image, :host([lower-image]) img {
        z-index: -1;
      }
      input {
        display: none;
      }
      paper-icon-button {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 calc(50% - 24px);
        color: white;
        --paper-icon-button-ink-color: transparent;
      }
      :host(:hover) paper-icon-button {
        display: block;
      }
    `;
  }
  render() {
    return html`
      ${!this.src ? ''
        : this.sizing
          ? html`<iron-image .src=${this.src} .sizing=${this.sizing}></iron-image>` 
          : html`<img .src=${this.src}>`}
      <input
        id="input"
        type="file"
        accept="image/png, image/jpeg"
        @change=${async (event) => {
          const file = event.target.files[0];
          event.target.value = '';
          this.dispatchEvent(new CustomEvent('save', {detail: file}));
          this.src = await readFile(file);
        }}>
      <paper-icon-button
        noink
        icon="image:image"
        @click=${() => this.shadowRoot.getElementById('input').click()}>
      </paper-icon-button>
    `;
  }
});
