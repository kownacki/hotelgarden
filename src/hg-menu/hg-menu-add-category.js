import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/paper-dialog@^3.0.1/paper-dialog.js?module';
import 'https://unpkg.com/@polymer/paper-icon-button@^3.0.2/paper-icon-button.js?module';
import 'https://unpkg.com/@polymer/iron-icons@^3.0.1/iron-icons.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@material/mwc-textfield@^0.9.1/mwc-textfield.js?module';

class HgMenuAddCategory extends LitElement {
  static get properties() {
    return {
      categories: Array,
    };
  }
  static get styles() {
    return css`
      paper-icon-button {
        width: 48px;
        height: 48px;
        padding: 0;
      }
    `;
  }
  render() {
    const addCategory = () => {
      this.shadowRoot.getElementById('dialog').close();
      this.categories.push({
        name: this.shadowRoot.getElementById('name').value,
      });
      this.dispatchEvent(new CustomEvent('category-added'));
    };
    return html`
      <paper-icon-button 
        icon="icons:add"
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      
      <paper-dialog id="dialog">
        <div>Dodaj kategorię</div>
        <mwc-textfield id="name" label="Nazwa"></mwc-textfield>
        <mwc-button raised label="Dodaj" @click=${addCategory}></mwc-button>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-menu-add-category', HgMenuAddCategory);
