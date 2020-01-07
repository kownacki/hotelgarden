import {LitElement, html, css} from 'lit-element';
import '../../elements/hg-list/hg-list-editable-text.js';

customElements.define('hg-menu-item', class extends LitElement {
  static get properties() {
    return {
      item: Object,
      disableEdit: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        padding: 15px 50px ;
      }
      .text  {
        flex-grow: 1;
      }
      .right {
        margin-left: 40px;
      }
      .price {
        text-align: right;
        font-size: 20px;
        min-width: 50px;
        color: var(--primary-color);
      }
      h3 {
        font-weight: 400;
        font-size: 20px;
        margin: 0 0 10px;
      }
      p {
        font-weight: 300;
        font-size: 18px;
        margin: 0 0 10px;
      }
    `;
  }
  render(){
    return html`
      <div class="text">
        <hg-list-editable-text
          float
          id="name"
          .disabled=${this.disableEdit && !this.shadowRoot.getElementById('name').showControls}
          .item=${this.item} 
          .field=${'name'}>
          <h3></h3>
        </hg-list-editable-text>
        <hg-list-editable-text
          float
          id="description"
          .disabled=${this.disableEdit && !this.shadowRoot.getElementById('description').showControls}
          .item=${this.item} 
          .field=${'description'}>
          <p></p>
        </hg-list-editable-text>
      </div>
      <div class="right">
        <hg-list-editable-text
          float
          id="price"
          .disabled=${this.disableEdit && !this.shadowRoot.getElementById('price').showControls}
          .item=${this.item} 
          .field=${'price'}>
          <div class="price"></div>
        </hg-list-editable-text>
      </div>
    `;
  }
});
