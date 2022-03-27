import {LitElement, html, css, unsafeCSS} from 'lit';
import sharedStyles from '../styles/shared-styles.js'
import {firebaseUtils as fb} from '../utils/firebase.js';
import {ItemsDbSyncController} from '../utils/ItemsDbSyncController.js';
import '../edit/hg-editable-text.js';

const maxImageWidth = 360;
const maxImageHeight = 150;

export class HgInfographic extends LitElement {
  _itemsDbSync;
  static properties = {
    uid: String,
    _path: fb.Path,
    _items: Object,
    _itemsReady: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      ${unsafeCSS(`
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
      border-bottom: 20px solid var(--paper-grey-200);
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
      background: var(--paper-grey-200);
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
        border-top: 20px solid var(--paper-grey-200);
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
        border-top: 20px solid var(--paper-grey-200);
        border-bottom: none;
      }
    }
  `];
  constructor() {
    super();
    this._itemsDbSync = new ItemsDbSyncController(
      this,
      async (path) => await fb.get(path) || {},
      async (path, index, {field, data}, oldItem, items) => {
        const updatedData = await fb.updateDataOrImageInObject(field, path, `${index}.${field}`, data, items);
        return {
          ...oldItem,
          [field]: updatedData,
        };
      },
      (itemsReady) => this._itemsReady = itemsReady,
      (items) => this._items = items,
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = fb.path(`infographics/${this.uid}`);
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
            <hg-image
              .path=${this._path.extend(`${index}.image`)}
              .noGet=${true}
              .noUpdate=${true}
              .image=${item.image}
              .ready=${this._itemsReady}
              .fit=${'cover'}
              .maxWidth=${maxImageWidth}
              .maxHeight=${maxImageHeight}
              @image-uploaded=${(event) => {
                this._itemsDbSync.requestItemUpdate(index, {field: 'image', data: event.detail});
              }}>
            </hg-image>
          </div>
        `, this._items)}
      </div>
    `;
  }
}
customElements.define('hg-infographic', HgInfographic);
