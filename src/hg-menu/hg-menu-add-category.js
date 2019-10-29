import {LitElement, html, css} from 'lit-element';

customElements.define('hg-menu-add-category', class extends LitElement {
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
    //todo Is it performant to place helper functions in render()?
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
});
