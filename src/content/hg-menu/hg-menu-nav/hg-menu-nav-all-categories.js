import {LitElement, html, css} from 'lit';
import {size} from 'lodash-es';
import {getSelectedIndexAfterChange} from '../../../../utils/list.js';
import '../../../elements/hg-list-old.js';
import sharedStyles from '../../../styles/shared-styles.js';
import {getCategoryName} from '../hg-menu-nav.js';
import './hg-menu-nav-item';

const configure = {
  getIcon: () => 'add_box',
  getData: (that, category) => {},
  setData: (that, category) => {},
  template: (that, category) => html`
    <div>
      Czy na pewno chcesz dodać ${that.itemName} do tego menu?
    </div>
  `,
};

export class HgMenuNavAllCategories extends LitElement {
  static properties = {
    categories: Object,
    selectedCategoryIndex: Number,
    showControls: Boolean,
    disableControls: Boolean,
  };
  static styles = sharedStyles;
  _getNewSelectedCategoryIndex(newCategories, changeType, changeData) {
    return getSelectedIndexAfterChange(
      this.selectedCategoryIndex,
      size(newCategories),
      changeType,
      changeData
    );
  }
  _requestSelectedCategoryChange(index) {
    this.dispatchEvent(new CustomEvent('request-selected-category-change', {
      detail: {
        index,
      }
    }));
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
  _requestAddPageCategory(allCategoryIndex) {
    this.dispatchEvent(new CustomEvent('request-add-page-category', {
      detail: {
        allCategoryIndex,
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
        .addAtStart=${true}
        .noSwap=${true}
        .vertical=${true}
        .items=${this.categories}
        .showControls=${this.showControls}
        .disableControls=${this.disableControls}
        .getItemName=${getCategoryName}
        .itemTemplate=${(category, index) => html`
          <hg-menu-nav-item
            .category=${category}
            .selected=${this.selectedCategoryIndex === Number(index)}
            @click=${() => {
              this._requestSelectedCategoryChange(Number(index));
            }}>
          </hg-menu-nav-item>
        `}
        .configure=${configure}
        @request-items-change=${({detail: {newItems, type, data}}) => {
          const newSelectedCategoryIndex = this._getNewSelectedCategoryIndex(newItems, type, data);
          this._requestCategoriesChange(newItems, newSelectedCategoryIndex, type, data);
        }}
        @request-item-configure=${({detail: {index}}) => {
          this._requestAddPageCategory(Number(index));
        }}>
      </hg-list-old>
    `;
  }
}
customElements.define('hg-menu-nav-all-categories', HgMenuNavAllCategories);
