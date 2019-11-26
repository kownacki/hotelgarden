import {LitElement, html, css} from 'lit-element';
import {swapArrayItems} from '../utils.js';
import './hg-menu-item.js';
import './hg-menu-add-item.js';

customElements.define('hg-menu-main', class extends LitElement {
  static get properties() {
    return {
      category: Object,
      categories: Array,
    };
  }
  static get styles() {
    return css`
      :host {
        padding-right: 20px;
      }
      ul {
        padding: 0;
        list-style: none
      }
      iron-image {
        display: block;
        height: 170px;
      }
    `;
  }
  render(){
    return html`
      ${_.isEmpty(this.categories) ? html`diema kategorii` : html`
        <h2>${this.category.name}</h2>
        <iron-image sizing="cover" src="https://u.profitroom.pl/2017.airporthotel.pl/thumb/700x170/uploads/Restauracja_Mirage_Potrawy/Beznazwy-1_2.jpg"></iron-image>
        <ul>
          ${_.map.convert({cap: false})((item, index) =>
            html`<li>
              <hg-menu-item 
                .itemsLength=${this.category.items.length}
                .item=${item}
                .index=${index}
                @request-move=${(event) => {
                  swapArrayItems(index, index + event.detail, this.category.items) ; 
                  this.requestUpdate();
                }}
                @request-delete=${() => { 
                  this.category.items.splice(index, 1);
                  this.requestUpdate();
                }}>
              </hg-menu-item>
            </li>`
          , this.category.items)}
        </ul>
        <hg-menu-add-item
          .items=${this.category.items} 
          @item-added=${() => this.requestUpdate()}>
        </hg-menu-add-item>
      `}
    `;
  }
});
