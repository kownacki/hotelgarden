import {LitElement, html, css} from 'lit-element';

customElements.define('hg-menu-add-item', class extends LitElement {
  static get properties() {
    return {
      items: Array,
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
    const addItem = () => {
      this.shadowRoot.getElementById('dialog').close();
      this.items.push({
        name: this.shadowRoot.getElementById('name').value,
        description: this.shadowRoot.getElementById('description').value,
        price: this.shadowRoot.getElementById('price').value,
      });
      this.dispatchEvent(new CustomEvent('item-added'));
    };
    return html`
      <paper-icon-button 
        icon="icons:add"
        @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      
      <paper-dialog id="dialog">
        <div>Dodaj pozycję</div>
        <mwc-textfield id="name" label="Nazwa"></mwc-textfield>
        <mwc-textfield id="description" label="Opis"></mwc-textfield>
        <mwc-textfield id="price" label="Cena"></mwc-textfield>
        <mwc-button raised label="Dodaj" @click=${addItem}></mwc-button>
      </paper-dialog>
    `;
  }
});
