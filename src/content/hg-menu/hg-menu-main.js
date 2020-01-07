import {LitElement, html, css} from 'lit-element';
import './hg-menu-item.js';
import {db} from "../../utils.js";
import sharedStyles from '../../sharedStyles.js'

customElements.define('hg-menu-main', class extends LitElement {
  static get properties() {
    return {
      doc: String,
      category: Object,
      categoryIndex: Number,
      categories: Object,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        padding-right: 20px;
        padding-bottom: 300px;
      }
      header {
        height: 170px;
        background: url("https://u.profitroom.pl/2017.airporthotel.pl/thumb/700x170/uploads/Restauracja_Mirage_Potrawy/Beznazwy-1_2.jpg");
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 30px;
      }
      h3 {
        text-transform: uppercase;
        text-align: center;
        color: white;
        text-shadow: 0 0 6px var(--secondary-color);
        margin: 0;
      }

    `];
  }
  updateCategory() {
    this.category = _.set('items', this.shadowRoot.getElementById('list').items, this.category);
    this.categories[this.categoryIndex] = this.category;
  }
  render() {
    return html`
      ${_.isEmpty(this.categories) ? 'Brak kategorii' : html`
        <header>
          <hg-editable-text
            float
            id="name"
            .text=${this.category.name} 
            @save=${(event) => {
              db.doc('menu/' + this.doc).update({[`${this.categoryIndex}.name`]: event.detail});
              this.category.name = event.detail;
              this.dispatchEvent(new CustomEvent('category-renamed'));
            }}>
            <h3></h3>
          </hg-editable-text>
        </header>
        <hg-list
          id="list"
          .array=${true}
          .vertical=${true}
          .noGetItems=${true}
          .items=${_.get('items', this.category)}
          .path=${{doc: 'menu/' + this.doc, field: `${this.categoryIndex}.items`}}
          .getItemName=${(item) => `pozycję${item.name ? ` "${item.name}"`: ''}`}
          .itemTemplate=${(item, index, disableEdit) => html`<hg-menu-item .item=${item} .disableEdit=${disableEdit}></hg-menu-nav-item>`}
          @item-added=${() => this.updateCategory()}
          @item-deleted=${() => this.updateCategory()}>
        </hg-list>
      `}
    `;
  }
});
