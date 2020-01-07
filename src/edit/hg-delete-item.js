import {LitElement, html, css} from 'lit-element';

customElements.define('hg-delete-item', class extends LitElement {
  static get properties() {
    return {
      name: String,
      disable: Boolean,
      opened: {type: Boolean, reflect: true},
    };
  }
  static get styles() {
    return css`
      .warning {
        color: var(--paper-red-800);
        padding: 10px;
        background: var(--paper-red-100);
      }
      paper-icon-button {
        background: white;
        width: 24px;
        height: 24px;
        padding: 0;
      }
      .buttons {
        display: flex;
      }
    `;
  }
  render() {
    return html`
      <paper-icon-button 
        ?disabled=${this.disable}
        icon="icons:delete"
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      <paper-dialog 
        id="dialog" 
        @opened-changed=${(event) => {this.opened = event.target.opened; this.dispatchEvent(new CustomEvent('opened-changed'))}}>
        <div class="warning">
          <iron-icon icon="warning"></iron-icon>
          Czy na pewno usunąć ${this.name}? 
          Usunięte dane nie mogą być przywrócone.
        </div>
        <div class="buttons">
          <paper-button raised @click=${() => this.shadowRoot.getElementById('dialog').close()}>Anuluj</paper-button>   
          <paper-button raised @click=${() => {
            this.shadowRoot.getElementById('dialog').close();
            this.dispatchEvent(new CustomEvent('request-delete', {composed: true}));
          }}>Usuń</paper-button>
        </div>
      </paper-dialog>
    `;
  }
});
