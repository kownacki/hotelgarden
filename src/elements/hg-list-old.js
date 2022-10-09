import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {repeat} from 'lit/directives/repeat.js';
import sharedStyles from '../styles/shared-styles.js'
import {DbPath, updateInDb} from '../utils/database.js';
import {array, generateUid} from '../utils.js';
import './hg-list-old/hg-list-old-item.js';

export default class HgListOld extends LitElement {
  static properties = {
    // flags
    addAtStart: Boolean,
    noAdd: Boolean,
    noSwap: Boolean,
    noBuiltInDelete: Boolean,
    vertical: Boolean,
    // required params
    path: DbPath,
    itemTemplate: Function,
    getItemName: Function,
    // optional params
    enableEditing: Boolean,
    transform: Function,
    onAdd: Function,
    onDelete: Function,
    configure: Object,
    emptyTemplate: Object,
    items: Object,
    // observables
    editing: Boolean,
    // private
    _list: Array,
    _listNotEmpty: {type: Boolean, reflect: true, attribute: 'list-not-empty'},
    processing: Boolean,
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
    if (changedProperties.has('editing')) {
      this.dispatchEvent(new CustomEvent('editing-changed', {detail: this.editing, composed: true}));
    }
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
  updateData(field, data) {
    return updateInDb(this.path.extend(field), data);
  }
  async updateItem(key, field, data) {
    this.processing = true;
    await this.updateData(`${key}.${field}`, data);
    this.items[key][field] = data;
    this.processing = false;
  }
  async deleteItem(key) {
    this.processing = true;
    if (this.onDelete) {
      await this.onDelete(this.items[key]);
    }
    let newItems;
    newItems = _.toArray(this.items);
    newItems.splice(key, 1);
    newItems = {...newItems};

    if (!this.noBuiltInDelete) {
      await this.updateData('', {...newItems});
    }
    this.items = newItems;
    this.dispatchEvent(new CustomEvent('item-deleted', {detail: key}));
    this.processing = false;
  }
  async swapItems(index1, index2) {
    this.processing = true;
    const newItems = array.swapItems(index1, index2, _.clone(this.items));
    await this.updateData('', {...newItems});
    this.items = newItems;
    this.dispatchEvent(new CustomEvent('items-swapped', {detail: [index1, index2]}));
    this.processing = false;
  }
  async addItem() {
    this.processing = true;
    let newItem = {uid: generateUid()};
    newItem = this.onAdd ? await this.onAdd(newItem) : newItem;
    if (newItem) {
      await this.updateData(String(_.size(this.items)), newItem);
      //todo use firebase.firestore.FieldValue.arrayUnion
      this.items = _.set(_.size(this.items), newItem, this.items);
      this.dispatchEvent(new CustomEvent('item-added'));
    }
    this.processing = false;
  }
  render() {
    return html`
      ${(this.addAtStart ? _.reverse : _.identity)([
        !this._listNotEmpty && this.emptyTemplate ? this.emptyTemplate : '',
        repeat(this._list || [], (key) => _.get(`${key}.uid`, this.items), (key, listIndex) =>
          !_.get(key, this.items) ?  '' : html`<hg-list-old-item
            style="${this.calculateItemTop ? `top: ${this.calculateItemTop(listIndex + ((this.enableEditing && !this.noAdd) ? 1 : 0)) * 100}%` : ''}"
            .item=${this.items[key]}
            .getItemName=${this.getItemName}
            .first=${listIndex === 0}
            .last=${listIndex === _.size(this._list) - 1}
            .noSwap=${this.noSwap || !this.enableEditing}
            .noDelete=${!this.enableEditing}
            .vertical=${this.vertical}
            .disableEdit=${this.processing || this.editing}
            .configure=${this.enableEditing && this.configure}
            @request-delete=${() => this.deleteItem(key)}
            @swap=${async (event) => this.swapItems(key, this._list[listIndex + event.detail])}
            @update=${(event) => this.updateItem(key, event.detail.path, event.detail.data)}
            @show-controls-changed=${(event) => this.editing = event.detail}>
            ${this.itemTemplate(this.items[key], key, this.processing || this.editing)}
          </hg-list-old-item>`
        ),
        (!this.enableEditing || this.noAdd) ? '' : until(import('./hg-list-old/hg-list-old-add.js').then(() => {
          return html`
            <div class="add-container">
              <hg-list-old-add
                .disabled=${this.processing || this.editing}
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
