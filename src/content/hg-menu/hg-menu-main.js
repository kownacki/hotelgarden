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
    disableControls: Boolean,
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
    .non-public {
      color: var(--error-color);
      text-transform: uppercase;
      margin-bottom: 20px;
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
  _requestCategoryFieldChange(type, field, data) {
    this.dispatchEvent(new CustomEvent('request-category-field-change', {
      detail: {
        type,
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
              this._requestCategoryFieldChange('image', 'image', blob);
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
              this._requestCategoryFieldChange('data', 'name', name);
            }}
          >
            <h3></h3>
          </hg-editable-text>
        </header>
        ${!this.category.public ? html`<div class="non-public">Kategoria ukryta</div>`: ''}
        ${isEmpty(this.category.items) ? html`<div class="empty">Brak pozycji w kategorii</div>`: ''}
        <hg-list-old
          .__noAddUpdate=${true}
          .__noDeleteUpdate=${true}
          .__noSwapUpdate=${true}
          .__noItemChangeUpdate=${true}
          .vertical=${true}
          .items=${this.category.items}
          .showControls=${this.showControls}
          .disableControls=${this.disableControls}
          .getItemName=${(item) => `pozycję${item.name ? ` "${item.name}"`: ''}`}
          .itemTemplate=${(item, index, disableEdit) => 
            html`<hg-menu-item .item=${item} .disableEdit=${disableEdit} .isRestaurantMenu=${true}></hg-menu-nav-item>
          `}
          @editing-item-changed=${({detail: isEditingItem}) => {
            this.dispatchEvent(new CustomEvent('editing-category-items-text-changed', {detail: isEditingItem}));
          }}
          @request-items-change=${({detail: {newItems}}) => {
            this._requestCategoryFieldChange('data', 'items', newItems);
          }}
          @request-item-update=${({detail: {index, type, field, data}}) => {
            this._requestCategoryFieldChange(type, `items.${index}.${field}`, data);
          }}>
        </hg-list-old>
      `}
    `;
  }
}
customElements.define('hg-menu-main', HgMenuMain);
