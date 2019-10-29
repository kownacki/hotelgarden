import {LitElement, html, css} from 'lit-element';

customElements.define('hg-menu-rename-category', class extends LitElement {
  static get properties() {
    return {
      category: Object,
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
    const renameCategory = () => {
      this.shadowRoot.getElementById('rename-dialog').close();
      this.category.name = this.shadowRoot.getElementById('name').value;
      this.dispatchEvent(new CustomEvent('category-renamed', {composed: true}));
    };
    return html`
      <paper-icon-button 
        icon="icons:create"
        @click=${() => this.shadowRoot.getElementById('rename-dialog').open()}>
      </paper-icon-button>
      
      <paper-dialog id="rename-dialog">
        <div>Zmień nazwę kategorii "${this.category.name}"</div>
        <mwc-textfield id="name" label="Nowa nazwa" value=${this.category.name}></mwc-textfield>
        <mwc-button raised label="Zapisz" @click=${renameCategory}></mwc-button>
      </paper-dialog>
    `;
  }
});
