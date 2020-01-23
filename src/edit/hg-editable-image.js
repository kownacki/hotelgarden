import {LitElement, html, css} from 'lit-element';
import firebase from "firebase";

const readFile = (file) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (event) => resolve(event.target.result);
  reader.readAsDataURL(file);
});

export default class HgEditableImage extends LitElement {
  static get properties() {
    return {
      src: {
        type: Boolean,
        reflect: true,
        attribute: 'not-empty',
      },
      sizing: String,
      presize: {type: Boolean, reflect: true},
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = firebase.auth().onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .container {
        position: relative;
        height: 100%;
      }
      :host(:not([not-empty])) .container {
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
      :host([lower-image]) .image {
        z-index: -1;
      }
      input {
        display: none;
      }
      paper-icon-button {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 0 calc(50% - 24px);
        color: white;
        --paper-icon-button-ink-color: transparent;
      }
      .container:hover paper-icon-button {
        display: block;
      }
    `;
  }
  render() {
    return html`
      <div class="container">
        ${!this.src ? ''
          : this.sizing
            ? html`<iron-image class="image" .src=${this.src} .sizing=${this.sizing}></iron-image>` 
            : html`<img class="image" .src=${this.src}>`}
        ${!this._loggedIn ? '' : html`
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
        `}
      </div>
    `;
  }
}
customElements.define('hg-editable-image', HgEditableImage);
