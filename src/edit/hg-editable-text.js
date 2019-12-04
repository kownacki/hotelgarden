import {LitElement, html, css} from 'lit-element';

customElements.define('hg-editable-text', class extends LitElement {
  static get properties() {
    return {
      text: String,
      css: Object,
      _showControls: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this.shadowRoot.getElementById('text').addEventListener('input', () => this._showControls = true);
    })();
  }
  updated(changedProperties) {
    if (changedProperties.has('_showControls')) {
      //todo add also when changing location
      window.onbeforeunload = !this._showControls ? null : () => {
        window.scrollTo(0, this.shadowRoot.getElementById('text').offsetTop - 70);
        this.shadowRoot.getElementById('text').focus();
        return '';
      };
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
      ${this.css}
      <div id="text" contenteditable>${this.text}</div>
      <div class="edit" ?hidden=${!this._showControls}>
        <paper-button
          raised
          @click=${() => {
            this._showControls = false;
            this.shadowRoot.getElementById('text').innerHTML = this.text;
          }}>
          Cofnij
        </paper-button>
        <paper-button
          raised
          @click=${() => {
            this._showControls = false;
            this.text = this.shadowRoot.getElementById('text').innerText;
            this.dispatchEvent(new CustomEvent('save', {detail: this.text}));
          }}>
          Zapisz
        </paper-button>
    `;
  }
});
