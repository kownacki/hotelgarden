import {LitElement, html, css, unsafeCSS} from 'lit';
import '../../edit/hg-editable-text.js';
import '../../elements/mkwc/hg-editable-image.js';
import {HgListOldItemsChangeType} from '../../elements/hg-list-old.js';
import sharedStyles from '../../styles/shared-styles.js'
import {createDbPath, updateImageInDb} from '../../utils/database.js';
import {updateData} from '../../utils.js';
import './hg-menu-item.js';

const maxImageWidth = 700;
const maxImageHeight = 170;

export class HgMenuMain extends LitElement {
  static properties = {
    uid: String,
    category: Object,
    categoryIndex: Number,
    categories: Object,
    enableEditing: Boolean,
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
  updateCategory() {
    this.category = _.set('items', this.shadowRoot.getElementById('list').items, this.category);
    this.categories[this.categoryIndex] = this.category;
  }
  async updateName(data) {
    await updateData('menus/' + this.uid, `${this.categoryIndex}.name`, data);
    this.category.name = data;
    this.dispatchEvent(new CustomEvent('category-changed'));
  }
  async updateImage(file) {
    this.category.image = await updateImageInDb(createDbPath('menus/' + this.uid, `${this.categoryIndex}.image`), file, (_.get('image.name', this.category)));
    //todo it fixes bug when switching to category without image after adding image but causes flickering
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('category-changed'));
  }
  render() {
    // todo when setting name and switching to another item name stays
    return html`
      ${_.isEmpty(this.categories) ? 'Brak kategorii' : html`
        <header>
          <hg-editable-image
            .src=${this.category.image?.url}
            .ready=${true}
            .fit=${'cover'}
            .maxWidth=${maxImageWidth}
            .maxHeight=${maxImageHeight}
            @image-uploaded=${({detail: blob}) => this.updateImage(blob)}>
          </hg-editable-image>
          <hg-editable-text
            .ready=${true}
            float
            class="name"
            id="name"
            .text=${this.category.name} 
            @save=${(event) => this.updateName(event.detail)}>
            <h3></h3>
          </hg-editable-text>
        </header>
        ${_.isEmpty(this.category.items) ? html`<div class="empty">Brak pozycji w kategorii</div>`: ''}
        <hg-list-old
          id="list"
          .vertical=${true}
          .items=${_.get('items', this.category)}
          .path=${createDbPath(`menus/${this.uid}`, `${this.categoryIndex}.items`)}
          .enableEditing=${this.enableEditing}
          .getItemName=${(item) => `pozycję${item.name ? ` "${item.name}"`: ''}`}
          .itemTemplate=${(item, index, disableEdit) => 
            html`<hg-menu-item .item=${item} .disableEdit=${disableEdit} .isRestaurantMenu=${true}></hg-menu-nav-item>
          `}
          @request-items-change=${({detail: {type}}) => {
            if (type === HgListOldItemsChangeType.ITEM_ADD) {
              this.updateCategory()
            }
            else if (type === HgListOldItemsChangeType.ITEM_DELETE) {
              this.updateCategory()
            }
          }}
        </hg-list-old>
      `}
    `;
  }
}
customElements.define('hg-menu-main', HgMenuMain);
