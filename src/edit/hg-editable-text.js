import {LitElement, html, css} from 'lit-element';
import {headerHeight} from '../utils.js'

export default class HgEditableText extends LitElement {
  static get properties() {
    return {
      text: String,
      disabled: Boolean,
      showControls: Boolean,
      multiline: {type: Boolean, reflect: true},
      float: {type: Boolean, reflect: true},
      _editable: Element,
    };
  }
  constructor() {
    super();
    const timeout = setTimeout(() => {
      if (this._editable) {
        clearTimeout(timeout)
      } else {
        this.setEditable();
      }
    }, 500);
  }
  setEditable() {
    let slotted = this.querySelector('*');
    while (slotted.tagName === 'SLOT') {
      slotted = slotted.assignedElements()[0];
    }
    this._editable = (slotted.shadowRoot && slotted.shadowRoot.getElementById('editable')) || slotted;
    this._editable.setAttribute('contenteditable', true);
    this._editable.addEventListener('input', () => {
      this.showControls = true;
      this.setAttribute('not-empty', '');
    });
    this._editable.addEventListener("focus", () => {
      this._editable.style['text-transform'] = "initial";
    });
    this._editable.addEventListener("blur", () => {
      this._editable.style['text-transform'] = null;
    });
  }
  updated(changedProperties) {
    if (changedProperties.has('showControls')) {
      this.dispatchEvent(new CustomEvent('show-controls-changed', {detail: this.showControls, composed: true}));
      //todo add also when changing location
      //todo multiple onbeforeunload overlapping
      window.onbeforeunload = !this.showControls ? null : () => {
        window.scrollTo(0, this._editable.offsetTop - headerHeight - 10);
        this._editable.focus();
        return '';
      };
    }
    if (changedProperties.has('text')) {
      if (!this._editable) {
        this.setEditable();
      }
      this._editable.innerHTML = this.text;
      if (this.text) {
        this.setAttribute('not-empty', '');
      } else {
        this.removeAttribute('not-empty');
      }
    }
    if (changedProperties.has('disabled')) {
      this._editable.setAttribute('contenteditable', !this.disabled);
    }
  }
  static get styles() {
    return css`
      :host {
        display: block;
        background: rgba(var(--placeholder-color-rgb), 0.5);
        position: relative;
      }
      :host([not-empty]) {
        background: transparent;
      }
      :host([multiline]) {
        height: 150px;
      }
      :host([multiline][not-empty]) {
        height: auto;
      }
      ::slotted(*) {
        height: 100%;
        min-width: 20px;
      }
      .edit {
        margin-top: 5px;
        justify-content: flex-end;
        flex-wrap: wrap;
      }
      .edit:not([hidden]) {
        display: flex;
      }
      :host([float]) .edit {
        position: absolute;
        top: 100%;
        right: 0;
        z-index: 1;
      }
      paper-button {
        background: white;
      }
    `;
  }
  render() {
    return html`
      <slot id="text"></slot>
      <div class="edit" ?hidden=${!this.showControls}>
        <paper-button
          raised
          @click=${() => {
            this.showControls = false;
            this._editable.innerHTML = this.text ? this.text : '';
            if (!this.text) {
              this.removeAttribute('not-empty');
            }
          }}>
          Cofnij
        </paper-button>
        <paper-button
          raised
          @click=${() => {
            this.showControls = false;
            this.text = this._editable.textContent ? this._editable.textContent : '';
            this.dispatchEvent(new CustomEvent('save', {detail: this.text}));
          }}>
          Zapisz
        </paper-button>
    `;
  }
}
customElements.define('hg-editable-text', HgEditableText);
