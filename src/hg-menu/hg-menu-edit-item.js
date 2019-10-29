import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/paper-dialog@^3.0.1/paper-dialog.js?module';
import 'https://unpkg.com/@polymer/paper-icon-button@^3.0.2/paper-icon-button.js?module';
import 'https://unpkg.com/@polymer/iron-icons@^3.0.1/iron-icons.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import 'https://unpkg.com/@material/mwc-textfield@^0.9.1/mwc-textfield.js?module';

customElements.define('hg-menu-edit-item', class extends LitElement {
  static get properties() {
    return {
      item: Object,
    };
  }
  static get styles() {
    return css`
      paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
      }
    `;
  }
  render() {
    const editItem = () => {
      this.shadowRoot.getElementById('edit-dialog').close();
      this.item.name = this.shadowRoot.getElementById('name').value;
      this.item.description = this.shadowRoot.getElementById('description').value;
      this.item.price = this.shadowRoot.getElementById('price').value;
      this.dispatchEvent(new CustomEvent('item-edited'));
    };
    return html`
      <paper-icon-button 
        icon="icons:create"
        @click=${() => this.shadowRoot.getElementById('edit-dialog').open()}>
      </paper-icon-button>
      
      <paper-dialog id="edit-dialog">
        <div>Edytuj pozycję "${this.item.name}"</div>
        <mwc-textfield id="name" label="Nowa nazwa" value=${this.item.name}></mwc-textfield>
        <mwc-textfield id="description" label="Nowy opis" value=${this.item.description}></mwc-textfield>
        <mwc-textfield id="price" label="Nowa cena" value=${this.item.price}></mwc-textfield>
        <mwc-button raised label="Zapisz" @click=${editItem}></mwc-button>
      </paper-dialog>
    `;
  }
});
