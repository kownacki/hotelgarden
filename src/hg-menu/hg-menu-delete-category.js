import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/paper-dialog@^3.0.1/paper-dialog.js?module';
import 'https://unpkg.com/@polymer/paper-icon-button@^3.0.2/paper-icon-button.js?module';
import 'https://unpkg.com/@polymer/iron-icons@^3.0.1/iron-icons.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@polymer/paper-styles@^3.0.1/color.js?module';

customElements.define('hg-menu-delete-category', class extends LitElement {
  static get properties() {
    return {
      category: Object,
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
    const deleteCategory = () => {
      this.shadowRoot.getElementById('dialog').close();
      this.dispatchEvent(new CustomEvent('request-delete', {composed: true}));
    };
    return html`
      <paper-icon-button 
        icon="icons:delete"
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      
      <paper-dialog id="dialog">
        <div class="warning">
          <iron-icon icon="warning"></iron-icon>
          Czy na pewno usunąć kategorię "${this.category.name}" i wszystkie zawierające się w niej pozycje? 
          Usunięte dane nie mogą być przywrócone.
        </div>
        <mwc-button raised label="Usuń" @click=${deleteCategory}></mwc-button>
      </paper-dialog>
    `;
  }
});
