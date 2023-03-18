import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {isEmpty} from 'lodash-es';
import sharedStyles from '../../styles/shared-styles.js';
import './hg-menu-nav/hg-menu-nav-all-categories.js';
import './hg-menu-nav/hg-menu-nav-item.js';
import './hg-menu-nav/hg-menu-nav-page-categories.js';

export const getCategoryName = (category) => {
  return `kategorię${category.name ? ` "${category.name}"`: ''} i wszystkie zawierające się w niej pozycje`;
};

export class HgMenuNav extends LitElement {
  static properties = {
    // { index: number, categoriesType: 'page' | 'all'}
    selectedCategory: Object,
    pageCategories: Object,
    allCategories: Object,
    menuName: String,
    showAllCategories: Boolean,
    showControls: Boolean,
    disableControls: Boolean,
  };
  static styles = [sharedStyles, css`
    .container {
      max-height: calc(100vh - var(--header-height));
      top: var( --header-height);
      overflow: auto;
      position: sticky;
    }
    .categories-container {
      margin-bottom: 10px;
    }
    .categories-header {
      margin-bottom: 10px;
    }
  `];
  _requestSelectedCategoryChange(index, categoriesType) {
    this.dispatchEvent(new CustomEvent('request-selected-category-change', {
      detail: {
        index,
        categoriesType,
      }
    }));
  }
  _requestPageCategoriesChange({newCategories, newSelectedCategoryIndex, changeType, changeData}) {
    this.dispatchEvent(new CustomEvent('request-page-categories-change', {
      detail: {
        newCategories,
        newSelectedCategoryIndex,
        changeType,
        changeData,
      },
    }));
  }
  _requestAllCategoriesChange({newCategories, newSelectedCategoryIndex, changeType, changeData}) {
    this.dispatchEvent(new CustomEvent('request-all-categories-change', {
      detail: {
        newCategories,
        newSelectedCategoryIndex,
        changeType,
        changeData,
      },
    }));
  }
  _requestAddPageCategory(allCategoryIndex) {
    this.dispatchEvent(new CustomEvent('request-add-page-category', {
      detail: {
        allCategoryIndex,
      },
    }));
  }
  _requestRemovePageCategory(index) {
    this.dispatchEvent(new CustomEvent('request-remove-page-category', {
      detail: {
        index,
      },
    }));
  }
  // unused
  _requestCategoryFieldChange(categoryIndex, type, dataPath, data) {
    this.dispatchEvent(new CustomEvent('request-category-field-change', {
      detail: {
        categoryIndex,
        type,
        dataPath,
        data,
      },
    }));
  }
  render() {
    return html`
      <div class="container">
        <div class="categories-container">
          ${when(this.showAllCategories, () => html`
            <div class="categories-header">Kategorie w ${this.menuName}</div>
          `)}
          ${when(isEmpty(this.pageCategories), () => html`
            <div class="smaller-text">Brak kategorii</div>
          `)}
          <hg-menu-nav-page-categories
            .categories=${this.pageCategories}
            .selectedCategoryIndex=${this.selectedCategory.categoriesType === 'page' ? this.selectedCategory.index : -1}
            .showControls=${this.showControls}
            .disableControls=${this.disableControls}
            @request-selected-category-change=${({detail: {index}}) => {
              this._requestSelectedCategoryChange(index, 'page');
            }}
            @request-categories-change=${({detail}) => {
              this._requestPageCategoriesChange(detail);
            }}
            @request-remove-category=${({detail: {index}}) => {
              this._requestRemovePageCategory(index);
            }}>
          </hg-menu-nav-page-categories>
        </div>
        ${when(this.showAllCategories, () => html`
          <div class="categories-container">
            <div class="categories-header">Pozostałe kategorie</div>
            ${when(isEmpty(this.allCategories), () => html`
              <div class="smaller-text">Brak kategorii</div>
            `)}
            <hg-menu-nav-all-categories
              .categories=${this.allCategories}
              .selectedCategoryIndex=${this.selectedCategory.categoriesType === 'all' ? this.selectedCategory.index : -1}
              .showControls=${this.showControls}
              .disableControls=${this.disableControls}
              @request-selected-category-change=${({detail: {index}}) => {
                this._requestSelectedCategoryChange(index, 'all');
              }}
              @request-categories-change=${({detail}) => {
                this._requestAllCategoriesChange(detail);
              }}
              @request-add-page-category=${({detail: {allCategoryIndex}}) => {
                this._requestAddPageCategory(allCategoryIndex);
              }}>
            </hg-menu-nav-all-categories>
          </div>
        `)}
      </div>
    `;
  }
}
customElements.define('hg-menu-nav', HgMenuNav);
