import {LitElement, html, css} from 'lit-element';

customElements.define('hg-editable-text', class extends LitElement {
  static get properties() {
    return {
      text: String,
      _showControls: Boolean,
      _slotted: Element,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._slotted = this.querySelector('*');
      this._slotted.setAttribute('contenteditable', true);
      this._slotted.addEventListener('input', () => this._showControls = true);
    })();
  }
  updated(changedProperties) {
    if (changedProperties.has('_showControls')) {
      //todo add also when changing location
      //todo multiple onbeforeunload overlapping
      window.onbeforeunload = !this._showControls ? null : () => {
        window.scrollTo(0, this._slotted.offsetTop - 70);
        this._slotted.focus();
        return '';
      };
    }
    if (changedProperties.has('text')) {
      this._slotted.innerHTML = this.text;
    }
  }
  static get styles() {
    return css`
      .edit {
        margin-top: 10px;
        justify-content: flex-end;
      }
      .edit:not([hidden]) {
        display: flex;
      }
    `;
  }
  render() {
    return html`
      <slot id="text"></slot>
      <div class="edit" ?hidden=${!this._showControls}>
        <paper-button
          raised
          @click=${() => {
            this._showControls = false;
            this._slotted.innerHTML = this.text;
          }}>
          Cofnij
        </paper-button>
        <paper-button
          raised
          @click=${() => {
            this._showControls = false;
            this.text = this._slotted.innerText;
            this.dispatchEvent(new CustomEvent('save', {detail: this.text}));
          }}>
          Zapisz
        </paper-button>
    `;
  }
});
