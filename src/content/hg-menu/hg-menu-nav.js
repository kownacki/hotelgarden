import {LitElement, html, css} from 'lit-element';
import '../../elements/hg-list.js';
import './hg-menu-nav-item.js';

customElements.define('hg-menu-nav', class extends LitElement {
  static get properties() {
    return {
      selectedCategory: Number,
      categories: Object,
    };
  }
  static get styles() {
    return css`
      :host {
      }
    `;
  }
  selectCategory(index) {
    this.selectedCategory = index;
    this.dispatchEvent(new CustomEvent('selected-category-changed', {detail: index}));
  };
  reselectAfterDelete(deletedIndex) {
    //todo think if more elegant solution to keep selected category correct
    if (deletedIndex < this.selectedCategory || (deletedIndex === this.selectedCategory && deletedIndex === _.size(this.categories))) {
      this.selectCategory(this.selectedCategory - 1);
    } else {
      this.selectCategory(this.selectedCategory);
    }
  }
  reselectAfterSwapped(index1, index2) {
    if (index1 === this.selectedCategory) {
      this.selectCategory(index2);
    } else if (index2 === this.selectedCategory) {
      this.selectCategory(index1);
    }
  }
  updateCategories() {
    this.categories = this.shadowRoot.getElementById('list').items;
    this.dispatchEvent(new CustomEvent('categories-changed', {detail: this.categories}));
  }
  requestUpdateCategoryName() {
    this.shadowRoot.getElementById('list').shadowRoot.querySelector('hg-menu-nav-item[selected]').requestUpdate();
  }
  render() {
    return html`
      <hg-list
        id="list"
        .array=${true}
        .vertical=${true}
        .noGetItems=${true},
        .items=${this.categories}
        .path=${{doc: 'menu/courses'}}
        .getItemName=${(category) => `kategorię${category.name ? ` "${category.name}"`: ''} i wszystkie zawierające się w niej pozycje`}
        .itemTemplate=${(category, index) => html`
          <hg-menu-nav-item
            .category=${category}
            .selected=${this.selectedCategory === Number(index)}
            @click=${() => this.selectCategory(Number(index))}>
          </hg-menu-nav-item>
        `}
        @item-added=${() => {this.updateCategories(); this.selectCategory(_.size(this.categories) - 1)}}
        @item-deleted=${(event) => {this.updateCategories(); this.reselectAfterDelete(Number(event.detail))}}
        @items-swapped=${(event) => {this.updateCategories(); this.reselectAfterSwapped(Number(event.detail[0]), Number(event.detail[1]))}}>
      </hg-list>
    `;
  }
});
