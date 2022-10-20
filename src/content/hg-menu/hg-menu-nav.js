import {LitElement, html, css} from 'lit';
import {size} from 'lodash-es';
import {getSelectedIndexAfterDelete, getSelectedIndexAfterItemSwap} from '../../../utils/list.js';
import {HgListOldItemsChangeType} from '../../elements/hg-list-old.js';
import './hg-menu-nav-item.js';

export class HgMenuNav extends LitElement {
  static properties = {
    selectedCategoryIndex: Number,
    categories: Object,
    enableEditing: Boolean,
  };
  static styles = css`
    hg-list-old {
      max-height: calc(100vh - var(--headerHeight));
      top: var( --headerHeight);
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
  _requestCategoriesChange(newCategories, newSelectedCategoryIndex) {
    this.dispatchEvent(new CustomEvent('request-categories-change', {
      detail: {
        newCategories,
        newSelectedCategoryIndex,
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
        .enableEditing=${this.enableEditing}
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
          this._requestCategoriesChange(newItems, newSelectedCategoryIndex);
        }}
      </hg-list-old>
    `;
  }
}
customElements.define('hg-menu-nav', HgMenuNav);
