import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {size} from 'lodash-es';
import {getSelectedIndexAfterDelete, getSelectedIndexAfterItemSwap} from '../../../utils/list.js';
import {HgListOldItemsChangeType} from '../../elements/hg-list-old.js';
import './hg-menu-nav-item.js';

const configure = {
  getIcon: (that, category) => {
    return category.public ? 'visibility_off' : 'visibility_on';
  },
  field: 'public',
  getData: (that, category) => {
    return !category.public;
  },
  setData: (that, category) => {},
  template: (that, category) => html`
    <div>
      ${when(
        category.public,
        () => html`Czy na pewno chcesz ukryć ${that.itemName}?`,
        () => html`Czy na pewno chcesz upublicznić ${that.itemName}?`,
      )}
    </div>
  `
};

export class HgMenuNav extends LitElement {
  static properties = {
    selectedCategoryIndex: Number,
    categories: Object,
    showControls: Boolean,
    disableControls: Boolean,
  };
  static styles = css`
    hg-list-old {
      max-height: calc(100vh - var(--header-height));
      top: var( --header-height);
      overflow: auto;
      position: sticky;
    }
  `;
  _requestSelectedCategoryChange(index) {
    this.dispatchEvent(new CustomEvent('request-selected-category-change', {detail: index}));
  };
  _getNewSelectedCategoryIndex(newCategories, changeType, changeData) {
    if (changeType === HgListOldItemsChangeType.ITEM_ADD) {
      return size(newCategories) - 1;
    }
    else if (changeType === HgListOldItemsChangeType.ITEM_DELETE) {
      const previousCategoriesSize = size(newCategories) + 1;
      return getSelectedIndexAfterDelete(
        Number(changeData.deletedIndex),
        this.selectedCategoryIndex,
        previousCategoriesSize,
      );
    }
    else if (changeType === HgListOldItemsChangeType.ITEMS_SWAP) {
      return getSelectedIndexAfterItemSwap(
        changeData.swappedIndexes.index1,
        changeData.swappedIndexes.index2,
        this.selectedCategoryIndex,
      );
    }
    return this.selectedCategoryIndex;
  }
  _requestCategoriesChange(newCategories, newSelectedCategoryIndex, changeType, changeData) {
    this.dispatchEvent(new CustomEvent('request-categories-change', {
      detail: {
        newCategories,
        newSelectedCategoryIndex,
        changeType,
        changeData,
      },
    }));
  }
  _requestCategoryFieldChange(categoryIndex, type, field, data) {
    this.dispatchEvent(new CustomEvent('request-category-field-change', {
      detail: {
        categoryIndex,
        type,
        field,
        data,
      },
    }));
  }
  render() {
    return html`
      <hg-list-old
        .__noAddUpdate=${true}
        .__noDeleteUpdate=${true}
        .__noSwapUpdate=${true}
        .__noItemChangeUpdate=${true}
        .vertical=${true}
        .items=${this.categories}
        .showControls=${this.showControls}
        .disableControls=${this.disableControls}
        .getItemName=${(category) => `kategorię${category.name ? ` "${category.name}"`: ''} i wszystkie zawierające się w niej pozycje`}
        .itemTemplate=${(category, index) => html`
          <hg-menu-nav-item
            .category=${category}
            .selected=${this.selectedCategoryIndex === Number(index)}
            @click=${() => this._requestSelectedCategoryChange(Number(index))}>
          </hg-menu-nav-item>
        `}
        @request-items-change=${({detail: {newItems, type, data}}) => {
          const newSelectedCategoryIndex = this._getNewSelectedCategoryIndex(newItems, type, data);
          this._requestCategoriesChange(newItems, newSelectedCategoryIndex, type, data);
        }}
        @request-item-update=${({detail: {index, type, field, data}}) => {
          this._requestCategoryFieldChange(index, type, field, data);
        }}
        .configure=${configure}>
      </hg-list-old>
    `;
  }
}
customElements.define('hg-menu-nav', HgMenuNav);
