import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {array, updateData, generateUid} from "../utils.js";
import sharedStyles from '../styles/shared-styles.js'
import './hg-list/hg-list-item.js';
import './hg-list/hg-list-add.js';

export default class HgList extends LitElement {
  static get properties() {
    return {
      // flags
      array: Boolean,
      noGetItems: Boolean,
      addAtStart: Boolean,
      noAdd: Boolean,
      vertical: Boolean,
      // required params
      path: Object, // {doc: String, [field: String]}
      itemTemplate: Function,
      getItemName: Function,
      // optional params
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
      _processing: Boolean,
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = auth.onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  updated(changedProperties) {
    if (changedProperties.has('editing')) {
      this.dispatchEvent(new CustomEvent('editing-changed', {detail: this.editing, composed: true}));
    }
    if (changedProperties.has('items')) {
      this.dispatchEvent(new CustomEvent('items-changed', {detail: this.items}));
    }
    if (changedProperties.has('path')) {
      if (this.path && !this.noGetItems) {
        (async () => {
          const doc = (await db.doc(this.path.doc).get()).data() || {};
          this.items = this.path.field ? _.get(this.path.field, doc) : doc;
        })();
      }
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
  updateData(path, data) {
    return updateData(this.path.doc, _.join('.', _.compact([this.path.field, path])), data);
  }
  async updateItem(key, field, data) {
    this._processing = true;
    await this.updateData(`${key}.${field}`, data);
    this.items[key][field] = data;
    this._processing = false;
  }
  async deleteItem(key) {
    this._processing = true;
    if (this.onDelete) {
      await this.onDelete(this.items[key]);
    }
    let newItems;
    if (this.array) {
      newItems = _.toArray(this.items);
      newItems.splice(key, 1);
      newItems = {...newItems};
    } else {
      newItems = _.omit(key, this.items);
    }
    await this.updateData('', {...newItems});
    this.items = newItems;
    this.dispatchEvent(new CustomEvent('item-deleted', {detail: key}));
    this._processing = false;
  }
  async swapItems(index1, index2) {
    this._processing = true;
    const newItems = array.swapItems(index1, index2, _.clone(this.items));
    await this.updateData('', {...newItems});
    this.items = newItems;
    this.dispatchEvent(new CustomEvent('items-swapped', {detail: [index1, index2]}));
    this._processing = false;
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
      /* Prevent bugs. Iphone adds style tag as host's last child. */
      :host > :not(style) {
        width: calc(100% / var(--columns));
      }
      hg-list-add {
        display: flex;
      }
      :host([list-not-empty]) hg-list-add {
        display: none;
      }
      :host(:hover) hg-list-add {
        display: flex;
      }
    `];
  }
  render() {
    return html`
      ${(this.addAtStart ? _.reverse : _.identity)([
        !this._listNotEmpty && this.emptyTemplate ? this.emptyTemplate : '',
        repeat(this._list || [], this.array ? (key) => _.get(`${key}.uid`, this.items) : _.identity, (key, listIndex) =>
          !_.get(key, this.items) ?  '' : html`<hg-list-item
            style="${this.calculateItemTop ? `top: ${this.calculateItemTop(listIndex + ((this._loggedIn && !this.noAdd) ? 1 : 0)) * 100}%` : ''}"
            .item=${this.items[key]}
            .getItemName=${this.getItemName}
            .first=${listIndex === 0}
            .last=${listIndex === _.size(this._list) - 1}
            .noSwap=${!this._loggedIn || !this.array}
            .noDelete=${!this._loggedIn}
            .vertical=${this.vertical}
            .disableEdit=${this._processing || this.editing}
            .configure=${this._loggedIn && this.configure}
            @request-delete=${() => this.deleteItem(key)}
            @swap=${async (event) => this.swapItems(key, this._list[listIndex + event.detail])}
            @update=${(event) => this.updateItem(key, event.detail.path, event.detail.data)}
            @show-controls-changed=${(event) => this.editing = event.detail}>
            ${this.itemTemplate(this.items[key], key, this._processing || this.editing)}
          </hg-list-item>`
        ),
        (!this._loggedIn || this.noAdd) ? '' : html`<hg-list-add 
          .disable=${this._processing || this.editing}
          @add=${async () => {
            this._processing = true;
            let newItem = {uid: generateUid()};
            newItem = this.onAdd ? await this.onAdd(newItem) : newItem;
            if (newItem) {
              await this.updateData(String(_.size(this.items)), newItem);
              //todo use firebase.firestore.FieldValue.arrayUnion  
              this.items = _.set(_.size(this.items), newItem, this.items);
              this.dispatchEvent(new CustomEvent('item-added'));
            }
            this._processing = false;
        }}>
        </hg-list-add>`
      ])}
    `;
  }
}
customElements.define('hg-list', HgList);
