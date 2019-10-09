import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/iron-image@^3.0.2/iron-image.js?module';
import 'https://unpkg.com/@polymer/paper-icon-button@^3.0.2/paper-icon-button.js?module';
import 'https://unpkg.com/@polymer/iron-icons@^3.0.1/iron-icons.js?module';
import 'https://unpkg.com/@polymer/paper-styles@^3.0.1/color.js?module';
import './hg-menu-delete-category.js';
import './hg-menu-rename-category.js';

class HgMenuNavItem extends LitElement {
  static get properties() {
    return {
      categories: Array,
      category: Object,
      index: Number,
      selected: {
        type: Boolean,
        reflect: true,
      }
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        margin: 1px 0;
      }
      .category {
        display: flex;
      }
      .name {
        padding: 10px;
        width: 200px;
      }
      :host([selected]) .category, .category:hover{
        background: var(--paper-brown-400);
        color: white;
        cursor: pointer;
      }
      paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
      }
      .edit {
        min-width: 120px;
      }
    `;
  }
  render() {
    return html`
      <div class="category" @click=${() => this.dispatchEvent(new CustomEvent('category-selected'))}>
        <iron-image src="https://u.profitroom.pl/2017.airporthotel.pl/thumb/105x80/uploads/Restauracja_Mirage_Potrawy/MIRZupaborowikowa.jpg"></iron-image>
        <div class="name">${this.category.name}</div>
      </div>
      <div class="edit">
        <paper-icon-button 
          icon="icons:arrow-upward" 
          .disabled=${this.index === 0}
          @click=${() => this.dispatchEvent(new CustomEvent('request-move', {detail: -1}))}>
         </paper-icon-button>
        <paper-icon-button 
          icon="icons:arrow-downward"
          .disabled=${this.index === this.categories.length - 1}
          @click=${() => this.dispatchEvent(new CustomEvent('request-move', {detail: +1}))}>
        </paper-icon-button>
        <hg-menu-rename-category 
          .category=${this.category}
          @category-renamed=${() => this.requestUpdate()}>
        </hg-menu-rename-category>
        <hg-menu-delete-category .category=${this.category}></hg-menu-delete-category>
      </div>
    `;
  }
}
customElements.define('hg-menu-nav-item', HgMenuNavItem);
