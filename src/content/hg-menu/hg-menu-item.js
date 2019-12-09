import {LitElement, html, css} from 'lit-element';
import './hg-menu-edit-item.js';
import '../../edit/hg-delete-item.js';

customElements.define('hg-menu-item', class extends LitElement {
  static get properties() {
    return {
      itemsLength: Number,
      item: Object,
      index: Number
    };
  }
  static get styles() {
    return css`
      :host, .item {
        display: flex;
        margin-bottom: 20px;
      }
      .text, .item {
        flex-grow: 1;
      }
      .price {
        padding: 0 24px;
        font-size: 20px;
        min-width: 50px;
      }
      paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
      }
      h3 {
        margin: 0 0 10px;
      }
      .edit {
        min-width: 120px;
      }
    `;
  }
  render(){
    return html`
      <div class="item">
        <div class="text">
          <h3>${this.item.name}</h3>
          ${this.item.description}
        </div>
        <div class="price">${this.item.price} zł</div>
      </div>
      <div class="edit">
        <paper-icon-button
          icon="icons:arrow-upward" 
          .disabled=${this.index === 0}
          @click=${() => this.dispatchEvent(new CustomEvent('request-move', {detail: -1}))}>
        </paper-icon-button>   
        <paper-icon-button
          icon="icons:arrow-downward"
          .disabled=${this.index === this.itemsLength - 1}
          @click=${() => this.dispatchEvent(new CustomEvent('request-move', {detail: +1}))}>
        </paper-icon-button>
        <hg-menu-edit-item
          .item=${this.item}
          @item-edited=${() => this.requestUpdate()}>
        </hg-menu-edit-item>
        <hg-delete-item .name=${this.item.name}></hg-delete-item>
      </div>
    `;
  }
});