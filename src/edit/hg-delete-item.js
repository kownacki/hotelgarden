import {LitElement, html, css} from 'lit-element';

customElements.define('hg-delete-item', class extends LitElement {
  static get properties() {
    return {
      name: String,
      'dialog-opened': {type: Boolean, reflect: true},
      disable: Boolean,
    };
  }
  static get styles() {
    return css`
      .warning {
        color: var(--paper-red-800);
        padding: 10px;
        background: var(--paper-red-100);
      }
      mwc-button {
        float: right;
      }
      paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
      }
    `;
  }
  render() {
    const deleteItem = () => {
      this.shadowRoot.getElementById('dialog').close();
      this.dispatchEvent(new CustomEvent('request-delete', {composed: true}));
    };
    return html`
      <paper-icon-button 
        ?disabled=${this.disable}
        icon="icons:delete"
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      
      <paper-dialog id="dialog" @opened-changed=${function(event) { this['dialog-opened'] = event.target.opened}}>
        <div class="warning">
          <iron-icon icon="warning"></iron-icon>
          Czy na pewno usunąć "${this.name}"? 
          Usunięte dane nie mogą być przywrócone.
        </div>
        <mwc-button raised label="Usuń" @click=${deleteItem}></mwc-button>
      </paper-dialog>
    `;
  }
});
