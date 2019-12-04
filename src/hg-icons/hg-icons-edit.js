import {LitElement, html, css} from 'lit-element';

customElements.define('hg-icons-edit', class extends LitElement {
  static get properties() {
    return {
      text: String,
      disable: Boolean,
      opened: {type: Boolean, reflect: true}
    };
  }
  static get styles() {
    return css`
      paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
      }
      mwc-textfield {
        display: block;
      }
    `;
  }
  render() {
    return html`
      <paper-icon-button
        ?disabled=${this.disable}
        icon="icons:create"
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      <paper-dialog 
        id="dialog" 
        @opened-changed=${(event) => {this.opened = event.target.opened; this.dispatchEvent(new CustomEvent('opened-changed'))}}>
        <div>Edytuj tekst "${this.text}"</div>
        <mwc-textfield id="name" label="Nowy tekst" value=${this.text}></mwc-textfield>
        <mwc-button raised label="Zapisz" @click=${() => {
          this.shadowRoot.getElementById('dialog').close();
          const text = this.shadowRoot.getElementById('name').value;
          this.dispatchEvent(new CustomEvent('request-edit', {detail: text, composed: true}));
        }}></mwc-button>
      </paper-dialog>
    `;
  }
});
