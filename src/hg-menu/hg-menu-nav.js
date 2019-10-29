import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/iron-image@^3.0.2/iron-image.js?module';
import 'https://unpkg.com/@polymer/paper-icon-button@^3.0.2/paper-icon-button.js?module';
import 'https://unpkg.com/@polymer/iron-icons@^3.0.1/iron-icons.js?module';
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
        margin-top: 66px;
      }
    `;
  }
  render() {
    const selectCategory = (index) => {
      this.selectedCategory = index;
      this.dispatchEvent(new CustomEvent('selected-category-changed', {detail: index}));
      this.requestUpdate();
    };
    const swapArrayItems = (arr, index1, index2) => {
      const temp = arr[index1];
      arr[index1] = arr[index2];
      arr[index2] = temp;
    };
    const swapCategories = (index1, index2) => {
      swapArrayItems(this.categories, index1, index2);
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
