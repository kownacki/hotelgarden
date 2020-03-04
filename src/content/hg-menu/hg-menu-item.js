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
        min-width: 40px;
        color: var(--primary-color);
      }
      h3 {
        font-weight: 400;
        font-size: 20px;
        margin: 0 0 10px;
      }
      p {
        font-weight: 300;
        margin: 0 0 10px;
      }
      @media all and (max-width: 959px) {
        :host {
          padding: 10px 20px;
        }
      }
      @media all and (max-width: 719px) {
        .right {
          margin-left: 20px;
        }
        .price, h3 {
          font-size: 18px;
        }
      }
    `;
  }
  render(){
    return html`
      <div class="text">
        <hg-list-editable-text
          float
          id="name"
          .disabled=${this.disableEdit && !_.get('showControls', this.shadowRoot.getElementById('name'))}
          .item=${this.item} 
          .field=${'name'}>
          <h3></h3>
        </hg-list-editable-text>
        <hg-list-editable-text
          float
          id="description"
          .disabled=${this.disableEdit && !_.get('showControls', this.shadowRoot.getElementById('description'))}
          .item=${this.item} 
          .field=${'description'}>
          <p class="smaller-text"></p>
        </hg-list-editable-text>
      </div>
      <div class="right">
        <hg-list-editable-text
          float
          id="price"
          .disabled=${this.disableEdit && !_.get('showControls', this.shadowRoot.getElementById('price'))}
          .item=${this.item} 
          .field=${'price'}>
          <div class="price"></div>
        </hg-list-editable-text>
      </div>
    `;
  }
});
