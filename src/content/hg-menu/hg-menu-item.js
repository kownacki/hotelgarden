import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';
import '../../elements/hg-list/hg-list-editable-text.js';

customElements.define('hg-menu-item', class extends LitElement {
  static get properties() {
    return {
      item: Object,
      disableEdit: Boolean,
      isRestaurantMenu: {type: Boolean, reflect: true, attribute: 'is-restaurant-menu'},
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: flex;
        padding: 0 0 30px;
      }
      :host([is-restaurant-menu]) {
        padding: 15px 50px;
      }
      .text  {
        flex-grow: 1;
      }
      .right {
        margin-left: 40px;
      }
      .price {
        text-align: right;
        min-width: 40px;
        color: var(--primary-color);
      }
      .name {
        margin: 0 0 10px;
      }
      .description {
        font-weight: 300;
        margin: 0 0 10px;
      }
      @media all and (max-width: 959px) {
        :host {
          padding: 0 0 20px;
        }
        :host([is-restaurant-menu]) {
          padding: 10px 20px;
        }
      }
      @media all and (max-width: 719px) {
        .right {
          margin-left: 20px;
        }
      }
      @media all and (max-width: 599px) {
        .name, .price {
          font-size: 18px;
        }
        .description {
          font-size: 16px;
        }
      }
    `];
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
          <div class="name"></div>
        </hg-list-editable-text>
        <hg-list-editable-text
          float
          id="description"
          .disabled=${this.disableEdit && !_.get('showControls', this.shadowRoot.getElementById('description'))}
          .item=${this.item} 
          .field=${'description'}>
          <div class="description smaller-text"></div>
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
