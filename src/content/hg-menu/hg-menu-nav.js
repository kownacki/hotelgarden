import {LitElement, html, css} from 'lit';
import {createDbPath, deleteImageInDb} from '../../utils/database.js';
import {HgListOldItemsChangeType} from '../../elements/hg-list-old.js';
import './hg-menu-nav-item.js';

export class HgMenuNav extends LitElement {
  static properties = {
    uid: String,
    selectedCategory: Number,
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
  render() {
    return html`
      <hg-list-old
        id="list"
        .vertical=${true}
        .items=${this.categories}
        .path=${createDbPath('menus/' + this.uid)}
        .enableEditing=${this.enableEditing}
        .getItemName=${(category) => `kategorię${category.name ? ` "${category.name}"`: ''} i wszystkie zawierające się w niej pozycje`}
        .itemTemplate=${(category, index) => html`
          <hg-menu-nav-item
            .category=${category}
            .selected=${this.selectedCategory === Number(index)}
            @click=${() => this.selectCategory(Number(index))}>
          </hg-menu-nav-item>
        `}
        .onDelete=${(item) => item.image ? deleteImageInDb(item.image.name) : null}
        @request-items-change=${({detail: {type, data}}) => {
          if (type === HgListOldItemsChangeType.ITEM_ADD) {
            this.updateCategories();
            this.selectCategory(_.size(this.categories) - 1);
          }
          else if (type === HgListOldItemsChangeType.ITEM_DELETE) {
            this.updateCategories();
            this.reselectAfterDelete(Number(data.deletedIndex));
          }
          else if (type === HgListOldItemsChangeType.ITEMS_SWAP) {
            this.updateCategories();
            this.reselectAfterSwapped(
              data.swappedIndexes.index1,
              data.swappedIndexes.index2,
            );
          }
        }}
      </hg-list-old>
    `;
  }
}
customElements.define('hg-menu-nav', HgMenuNav);
