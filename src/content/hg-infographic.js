import {LitElement, html, css, unsafeCSS} from 'lit';
import materialColors from 'material-colors';
import sharedStyles from '../styles/shared-styles.js'
import {createDbPath, DbPath, getFromDb, updateDataOrImageInObjectInDb, updateInDb} from '../utils/database.js';
import {ItemsDbSyncController} from '../utils/ItemsDbSyncController.js';
import '../elements/mkwc/hg-editable-image.js';
import '../edit/hg-editable-text.js';

const maxImageWidth = 360;
const maxImageHeight = 150;

export class HgInfographic extends LitElement {
  _itemsDbSync;
  static properties = {
    uid: String,
    _path: DbPath,
    _items: Object,
    _itemsReady: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      ${unsafeCSS(`
        --item-background-color: ${materialColors.grey['200']};
        --max-image-width: ${maxImageWidth}px;
        --max-image-height: ${maxImageHeight}px;
      `)}
      display: block;
      max-width: 900px;
      margin: 40px auto;
    }
    .items {
      display: flex;
      flex-wrap: wrap;
      margin: 60px 0;
    }
    .item {
      display: flex;
      flex-direction: column-reverse;
      position: relative;
    }
    .item::after {
      border-right: 20px solid transparent;
      border-bottom: 20px solid var(--item-background-color);
      border-left: 20px solid transparent;
      content: '';
      top: calc(50% - 20px);
      left: calc(50% - 20px);
      width: 0;
      height: 0;
      margin: 0 auto;
      position: absolute;
    }
    .item > * {
      height: var(--max-image-height);
    }
    .data {
      background: var(--item-background-color);
      color: var(--primary-color);
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      box-sizing: border-box;
      padding: 20px;
    }
    .number {
      font-weight: 300;
      font-size: 50px;
    }
    @media all and (min-width: 720px) {
      .item {
        width: 33.33%;
      }
      .item:nth-child(2), .item:nth-child(5) {
        flex-direction: column;
      }
      .item:nth-child(2)::after, .item:nth-child(5)::after {;
        top: calc(50%);
        border-top: 20px solid var(--item-background-color);
        border-bottom: none;
      }
    }
    @media all and (max-width: 719px) {
      .number {
        font-size: 40px;
      }
      .item {
        width: 50%;
      }
      .item:nth-child(even) {
        flex-direction: column;
      }
      .item:nth-child(even)::after {
        top: calc(50%);
        border-top: 20px solid var(--item-background-color);
        border-bottom: none;
      }
    }
  `];
  constructor() {
    super();
    this._itemsDbSync = new ItemsDbSyncController(
      this,
      {
        getItems: async (path) => await getFromDb(path) || {},
        updateItem: async (path, index, {field, data}, oldItem, items) => {
          const updatedData = await updateDataOrImageInObjectInDb(field, path, `${index}.${field}`, data, items);
          return {
            ...oldItem,
            [field]: updatedData,
          };
        },
        updateAllItems: async (path, data) => {
          await updateInDb(path, data);
          return data;
        },
        onDataReadyChange: (itemsReady) => this._itemsReady = itemsReady,
        onDataChange: (items) => this._items = items,
      },
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`infographics/${this.uid}`);
      this._itemsDbSync.setPath(this._path);
    }
  }
  render() {
    return html`
      <h2 class="content-heading">Hotel Garden w liczbach</h2>
      <div class="items">
        ${_.map.convert({cap: false})((item, index) => html`
          <div class="item">
            <div class="data">
              <hg-editable-text
                .ready=${this._itemsReady}
                float
                .text=${item.number}
                @save=${(event) => {
                  this._itemsDbSync.requestItemUpdate(index, {field: 'number', data: event.detail});
                }}>
                <div class="number"></div>
              </hg-editable-text>
              <hg-editable-text
                .ready=${this._itemsReady}
                float
                .text=${item.string}
                @save=${(event) => {
                  this._itemsDbSync.requestItemUpdate(index, {field: 'string', data: event.detail});
                }}>
                <div></div>
              </hg-editable-text>
            </div>
            <hg-editable-image
              .src=${item.image?.url}
              .ready=${this._itemsReady}
              .fit=${'cover'}
              .maxWidth=${maxImageWidth}
              .maxHeight=${maxImageHeight}
              @image-uploaded=${(event) => {
                this._itemsDbSync.requestItemUpdate(index, {field: 'image', data: event.detail});
              }}>
            </hg-editable-image>
          </div>
        `, this._items)}
      </div>
    `;
  }
}
customElements.define('hg-infographic', HgInfographic);
