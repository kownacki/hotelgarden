import {LitElement, html, css} from 'lit-element';

customElements.define('hg-editable-text', class extends LitElement {
  static get properties() {
    return {
      text: String,
      disabled: Boolean,
      showControls: Boolean,
      _slotted: Element,
    };
  }
  constructor() {
    super();
    this._slotted = this.querySelector('*');
    (async () => {
      await this.updateComplete;
      this._slotted.setAttribute('contenteditable', true);
      this._slotted.addEventListener('input', () => this.showControls = true);
    })();
  }
  updated(changedProperties) {
    if (changedProperties.has('showControls')) {
      this.dispatchEvent(new CustomEvent('show-controls-changed', {detail: this.showControls, composed: true}));
      //todo add also when changing location
      //todo multiple onbeforeunload overlapping
      window.onbeforeunload = !this.showControls ? null : () => {
        window.scrollTo(0, this._slotted.offsetTop - 70);
        this._slotted.focus();
        return '';
      };
    }
    if (changedProperties.has('text')) {
      this._slotted.innerHTML = this.text;
    }
    if (changedProperties.has('disabled')) {
      this._slotted.setAttribute('contenteditable', !this.disabled);
    }
  }
  static get styles() {
    return css`
      .edit {
        margin-top: 10px;
        justify-content: flex-end;
        flex-wrap: wrap;
      }
      .edit:not([hidden]) {
        display: flex;
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
            this._slotted.innerHTML = this.text;
          }}>
          Cofnij
        </paper-button>
        <paper-button
          raised
          @click=${() => {
            this.showControls = false;
            this.text = this._slotted.innerText;
            this.dispatchEvent(new CustomEvent('save', {detail: this.text}));
          }}>
          Zapisz
        </paper-button>
    `;
  }
});
