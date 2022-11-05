import {LitElement, html, css, unsafeCSS} from 'lit';
import {isEmpty} from 'lodash-es';
import '../../edit/hg-editable-text.js';
import '../../elements/mkwc/hg-editable-image.js';
import sharedStyles from '../../styles/shared-styles.js'
import './hg-menu-item.js';

const maxImageWidth = 700;
const maxImageHeight = 170;

export class HgMenuMain extends LitElement {
  static properties = {
    category: Object,
    categoryIndex: Number,
    categories: Object,
    showControls: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      ${unsafeCSS(`
        --max-image-width: ${maxImageWidth}px;
        --max-image-height: ${maxImageHeight}px;
      `)}
      padding-right: 20px;
    }
    header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      position: relative;
    }
    .empty {
      margin-bottom: 30px;
    }
    hg-editable-image {
      height: var(--max-image-height);
      width: 100%;
    }
    .name {
      width: calc(100% - 40px);
      max-height: calc(100% - 40px);
      position: absolute;
    }
    h3 {
      text-transform: uppercase;
      text-align: center;
      color: white;
      text-shadow: 0 0 6px var(--secondary-color);
      margin: 0;
    }
    @media all and (max-width: 839px) {
      hg-editable-image {
        height: 120px;
      }
    }
  `];
  _requestCategoryFieldChange(field, data) {
    this.dispatchEvent(new CustomEvent('request-category-field-change', {
      detail: {
        field,
        data,
      },
    }));
  }
  render() {
    // todo when setting name and switching to another item name stays
    return html`
      ${isEmpty(this.categories) ? 'Brak kategorii' : html`
        <header>
          <hg-editable-image
            .src=${this.category.image?.url}
            .ready=${true}
            .fit=${'cover'}
            .maxWidth=${maxImageWidth}
            .maxHeight=${maxImageHeight}
            @image-uploaded=${({detail: blob}) => {
              this._requestCategoryFieldChange('image', blob);
            }}>
          </hg-editable-image>
          <hg-editable-text
            .ready=${true}
            float
            class="name"
            id="name"
            .text=${this.category.name}
            @show-controls-changed=${({ detail: showEditableTextControls}) => {
              this.dispatchEvent(new CustomEvent('editing-category-name-changed', {detail: showEditableTextControls}));
            }}
            @save=${({detail: name}) => {
              this._requestCategoryFieldChange('name', name);
            }}
          >
            <h3></h3>
          </hg-editable-text>
        </header>
        ${isEmpty(this.category.items) ? html`<div class="empty">Brak pozycji w kategorii</div>`: ''}
        <hg-list-old
          .__noAddUpdate=${true}
          .__noDeleteUpdate=${true}
          .__noSwapUpdate=${true}
          .__noItemChangeUpdate=${true}
          .vertical=${true}
          .items=${this.category.items}
          .showControls=${this.showControls}
          .getItemName=${(item) => `pozycję${item.name ? ` "${item.name}"`: ''}`}
          .itemTemplate=${(item, index, disableEdit) => 
            html`<hg-menu-item .item=${item} .disableEdit=${disableEdit} .isRestaurantMenu=${true}></hg-menu-nav-item>
          `}
          @editing-item-changed=${({detail: isEditingItem}) => {
            this.dispatchEvent(new CustomEvent('editing-category-items-text-changed', {detail: isEditingItem}));
          }}
          @request-items-change=${({detail: {newItems}}) => {
            this._requestCategoryFieldChange('items', newItems);
          }}
          @request-item-update=${({detail: {updatedItem, index}}) => {
            this._requestCategoryFieldChange('items', { 
              ...this.category.items,
              [index]: updatedItem,
            });
          }}>
        </hg-list-old>
      `}
    `;
  }
}
customElements.define('hg-menu-main', HgMenuMain);
