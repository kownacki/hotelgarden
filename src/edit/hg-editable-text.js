import {LitElement, html, css} from 'lit-element';
import {headerHeight, moveOutFromShadowDom} from '../utils.js'

export default class HgEditableText extends LitElement {
  static get properties() {
    return {
      text: String,
      ready: {type: Boolean, reflect: true},
      disabled: Boolean,
      showControls: Boolean,
      rich: Boolean,
      multiline: {type: Boolean, reflect: true},
      float: {type: Boolean, reflect: true},
      _editable: Element,
      _editor: Element,
      _editorSet: Boolean,
    };
  }
  setEditable() {
    let slotted = this.querySelector('*');
    while (slotted.tagName === 'SLOT') {
      slotted = slotted.assignedElements()[0];
    }
    this._editable = (slotted.shadowRoot && slotted.shadowRoot.getElementById('editable')) || slotted;
    this._editable.setAttribute('contenteditable', true);

    this._editable.addEventListener("focus", () => {
      this._editable.style['text-transform'] = "initial";
    });
    this._editable.addEventListener("blur", () => {
      this._editable.style['text-transform'] = null;
    });
  }
  async setCkeditor() {
    this._editable.classList.add('content');
    await Promise.all([
      import('/node_modules/@ckeditor/ckeditor5-build-inline/build/ckeditor.js'),
      moveOutFromShadowDom(this._editable),
    ]);
    this._editor = await InlineEditor.create(this._editable);
    this._editor.model.document.on('change:data', () => {
      this.showControls = true;
      this.setAttribute('not-empty', '');
    });
  }
  async updated(changedProperties) {
    if (changedProperties.has('showControls')) {
      this.dispatchEvent(new CustomEvent('show-controls-changed', {detail: this.showControls, composed: true, bubbles: true}));
      //todo add also when changing location
      //todo multiple onbeforeunload overlapping
      window.onbeforeunload = !this.showControls ? null : () => {
        window.scrollTo(0, this._editable.offsetTop - headerHeight - 10);
        this._editable.focus();
        return '';
      };
    }
    if (changedProperties.has('ready') || changedProperties.has('text')) {
      if (this.ready) {
        if (!this._editable) {
          this.setEditable();
        }

        this._editable.innerHTML = this.text || (this.rich ? '<p></p>' : '');
        this.text ? this.setAttribute('not-empty', '') : this.removeAttribute('not-empty');

        if (!this._editorSet) {
          this._editorSet = true;
          if (this.rich) {
            this.setCkeditor();
          } else {
            this._editable.addEventListener('input', () => {
              this.showControls = true;
              this.setAttribute('not-empty', '');
            });
          }
        }
      }
    }
    if (changedProperties.has('disabled') || changedProperties.has('ready') || changedProperties.has('_editable')) {
      if (this._editable) {
        //todo empty textfield has height 0 when contenteditable set to false
        this._editable.setAttribute('contenteditable', !(this.disabled || !this.ready));
      }
    }
  }
  static get styles() {
    return css`
      :host {
        display: block;
        background: rgba(var(--placeholder-color-rgb), 0.5);
        position: relative;
      }
      :host(:not([ready])), :host([disabled]) {
        opacity: 50%;
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
        min-height: 1.25em;
      }
      ::slotted(.ck-focused) {
        z-index: 2;
        position: relative;
        background: white;
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
        z-index: 2;
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
            this.rich ? this._editor.setData(this.text || '') : (this._editable.innerHTML = this.text || '');
            this.showControls = false;
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
            this.text = this._editable.textContent || '';
            this.dispatchEvent(new CustomEvent('save', {detail: this.rich ? this._editor.getData() : this.text}));
          }}>
          Zapisz
        </paper-button>
    `;
  }
}
customElements.define('hg-editable-text', HgEditableText);
