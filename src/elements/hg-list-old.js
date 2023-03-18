import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {repeat} from 'lit/directives/repeat.js';
import {size} from 'lodash-es';
import sharedStyles from '../styles/shared-styles.js'
import {DbPath, updateInDb} from '../utils/database.js';
import {array, generateUid} from '../utils.js';
import './hg-list-old/hg-list-old-item.js';

export const HgListOldItemsChangeType = {
  ITEM_ADD: 'item-add',
  ITEM_DELETE: 'item-delete',
  ITEMS_SWAP: 'items-swap',
};

export default class HgListOld extends LitElement {
  static properties = {
    // flags
    addAtStart: Boolean,
    noAdd: Boolean,
    noSwap: Boolean,
    vertical: Boolean,
    __noAddUpdate: Boolean,
    __noDeleteUpdate: Boolean,
    __noSwapUpdate: Boolean,
    __noItemChangeUpdate: Boolean,
    // required params
    path: DbPath,
    itemTemplate: Function,
    getItemName: Function,
    // optional params
    showControls: Boolean,
    disableControls: Boolean,
    transform: Function,
    onAdd: Function,
    onDelete: Function,
    configure: Object,
    emptyTemplate: Object,
    items: Object,
    // private
    _list: Array,
    _listNotEmpty: {type: Boolean, reflect: true, attribute: 'list-not-empty'},
    _internalDisableControls: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    /* Prevent bugs. Iphone adds style tag as host's last child. */
    :host > :not(style) {
      width: calc(100% / var(--columns));
    }
    .add-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `];
  updated(changedProperties) {
    if (changedProperties.has('items')) {
      this.dispatchEvent(new CustomEvent('items-changed', {detail: this.items}));
    }
    if (changedProperties.has('items') || changedProperties.has('transform')) {
      this._list = _.flow([
        _.keys,
        ...(this.transform ? [this.transform(this.items)] : [])
      ])(this.items);
      this._listNotEmpty = !_.isEmpty(this._list);
      this.dispatchEvent(new CustomEvent('list-changed', {detail: this._list}));
    }
  }
  updateData(dataPath, data) {
    return updateInDb(this.path.extend(dataPath), data);
  }
  async updateItem(index, dataPath, data) {
    this._internalDisableControls = true;
    if (!this.__noItemChangeUpdate) {
      await this.updateData(`${index}.${dataPath}`, data);
    }
    // todo allow images
    this.dispatchEvent(new CustomEvent('request-item-update', {
      detail: {
        index,
        type: 'data',
        dataPath,
        data,
      },
    }));
    this._internalDisableControls = false;
  }
  async deleteItem(index) {
    this._internalDisableControls = true;
    if (this.onDelete) {
      await this.onDelete(this.items[index]);
    }
    let newItems;
    newItems = _.toArray(this.items);
    newItems.splice(index, 1);
    newItems = {...newItems};

    if (!this.__noDeleteUpdate) {
      await this.updateData('', {...newItems});
      this.items = newItems;
    }
    this.dispatchEvent(new CustomEvent('request-items-change', {
      detail: {
        type: HgListOldItemsChangeType.ITEM_DELETE,
        newItems,
        data: {
          deletedIndex: index,
        },
      },
    }));
    this._internalDisableControls = false;
  }
  async swapItems(index1, index2) {
    this._internalDisableControls = true;
    const newItems = array.swapItems(index1, index2, _.clone(this.items));
    if (!this.__noSwapUpdate) {
      await this.updateData('', {...newItems});
      this.items = newItems;
    }
    this.dispatchEvent(new CustomEvent('request-items-change', {
      detail: {
        type: HgListOldItemsChangeType.ITEMS_SWAP,
        newItems,
        data: {
          swappedIndexes: {
            index1: Number(index1),
            index2: Number(index2),
          },
        },
      },
    }));
    this._internalDisableControls = false;
  }
  async addItem() {
    this._internalDisableControls = true;
    let newItem = {uid: generateUid()};
    newItem = this.onAdd ? await this.onAdd(newItem) : newItem;
    if (newItem) {
      const newItems = {...this.items, [size(this.items)]: newItem};
      if (!this.__noAddUpdate) {
        await this.updateData(String(size(this.items)), newItem);
        //todo use firebase.firestore.FieldValue.arrayUnion
        this.items = newItems;
      }
      this.dispatchEvent(new CustomEvent('request-items-change', {
        detail: {
          type: HgListOldItemsChangeType.ITEM_ADD,
          newItems,
          data: {
            newItem,
          },
        },
      }));
    }
    this._internalDisableControls = false;
  }
  configureItem(index, data) {
    this.dispatchEvent(new CustomEvent('request-item-configure', {
      detail: {
        index,
        data,
      },
    }));
  }
  render() {
    return html`
      ${(this.addAtStart ? _.reverse : _.identity)([
        !this._listNotEmpty && this.emptyTemplate ? this.emptyTemplate : '',
        repeat(this._list || [], (key) => _.get(`${key}.uid`, this.items), (key, listIndex) =>
          !_.get(key, this.items) ?  '' : html`<hg-list-old-item
            style="${this.calculateItemTop ? `top: ${this.calculateItemTop(listIndex + ((this.showControls && !this.noAdd) ? 1 : 0)) * 100}%` : ''}"
            .item=${this.items[key]}
            .getItemName=${this.getItemName}
            .first=${listIndex === 0}
            .last=${listIndex === _.size(this._list) - 1}
            .noSwap=${this.noSwap || !this.showControls}
            .noDelete=${!this.showControls}
            .vertical=${this.vertical}
            .disableControls=${this._internalDisableControls || this.disableControls}
            .configure=${this.showControls && this.configure}
            @request-delete=${() => this.deleteItem(key)}
            @swap=${async (event) => this.swapItems(key, this._list[listIndex + event.detail])}
            @update=${(event) => this.updateItem(key, event.detail.path, event.detail.data)}
            @request-configure=${({ detail: {data}}) => this.configureItem(key, data)}
            @show-controls-changed=${({ detail: showEditableTextControls}) => {
              // todo change this event name and variable in editable-text
              this.dispatchEvent(new CustomEvent('editing-item-changed', {detail: showEditableTextControls}));
            }}
          >
            ${this.itemTemplate(this.items[key], key, this._internalDisableControls || this.disableControls)}
          </hg-list-old-item>`
        ),
        (!this.showControls || this.noAdd) ? '' : until(import('./hg-list-old/hg-list-old-add.js').then(() => {
          return html`
            <div class="add-container">
              <hg-list-old-add
                .disabled=${this._internalDisableControls || this.disableControls}
                @click=${() => this.addItem()}>
              </hg-list-old-add>
            </div>
          `;
        })),
      ])}
    `;
  }
}
customElements.define('hg-list-old', HgListOld);
