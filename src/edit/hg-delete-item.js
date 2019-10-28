import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/paper-dialog@^3.0.1/paper-dialog.js?module';
import 'https://unpkg.com/@polymer/paper-icon-button@^3.0.2/paper-icon-button.js?module';
import 'https://unpkg.com/@polymer/iron-icons@^3.0.1/iron-icons.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@polymer/paper-styles@^3.0.1/color.js?module';

class HgDeleteItem extends LitElement {
  static get properties() {
    return {
      name: String,
      'dialog-opened': {type: Boolean, reflect: true},
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
}
customElements.define('hg-delete-item', HgDeleteItem);
