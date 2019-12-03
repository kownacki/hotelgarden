import {LitElement, html, css} from 'lit-element';
import {array} from '../utils.js';
import './hg-menu-nav-item.js';
import './hg-menu-add-category.js';

customElements.define('hg-menu-nav', class extends LitElement {
  static get properties() {
    return {
      selectedCategory: {
        type: Number,
      },
      categories: Array,
    };
  }
  static get styles() {
    return css`
      :host {
      }
    `;
  }
  render() {
    const selectCategory = (index) => {
      this.selectedCategory = index;
      this.dispatchEvent(new CustomEvent('selected-category-changed', {detail: index}));
      this.requestUpdate();
    };
    const swapCategories = (index1, index2) => {
      array.swapItems(index1, index2, this.categories);
      if (index1 === this.selectedCategory) {
        selectCategory(index2);
      } else if (index2 === this.selectedCategory) {
        selectCategory(index1);
      }
      this.requestUpdate();
    };
    const deleteCategory = (index) => {
      //todo think if more elegant solution to keep selected category correct
      if (index < this.selectedCategory || (index === this.selectedCategory && index === this.categories.length - 1)) {
        selectCategory(this.selectedCategory - 1);
      } else {
        selectCategory(this.selectedCategory);
      }
      this.categories.splice(index, 1);
      this.requestUpdate();
    };
    return html`
      ${_.map.convert({cap: false})((category, index) => {
        return html`
          <hg-menu-nav-item
            .categories=${this.categories} 
            .category=${category} 
            .index=${index}
            .selected=${this.selectedCategory === index}
            @category-selected=${() => selectCategory(index)}
            @request-move=${(event) => swapCategories(index, index + event.detail)}
            @request-delete=${() => deleteCategory(index)}>
          </hg-menu-nav-item>
        `
      }, this.categories)}
      
      <hg-menu-add-category 
        .categories=${this.categories} 
        @category-added=${() => selectCategory(this.categories.length-1)}>
      </hg-menu-add-category>
    `;
  }
});
