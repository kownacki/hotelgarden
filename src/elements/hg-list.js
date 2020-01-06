import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {array, db, updateData, assignKeys, sleep} from "../utils.js";
import './hg-list/hg-list-item.js';
import './hg-list/hg-list-add.js';

customElements.define('hg-list', class extends LitElement {
  static get properties() {
    return {
      // flags
      array: Boolean,
      noGetItems: Boolean,
      addAtStart: Boolean,
      noAdd: Boolean,
      // params
      path: Object,
      transform: Function,
      itemTemplate: Function,
      getItemName: Object,
      configure: Object,
      emptyTemplate: Object,
      items: Array,
      _list: Array,
      _processing: Boolean,
    };
  }
  static get styles() {
    return css`
      :host > * {
        width: calc(100% / var(--columns));
      }
    `;
  }
  updated(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.path && !this.noGetItems) {
        (async () => {
          const doc = (await db.doc(this.path.doc).get()).data() || {};
          this.items = this.path.field ? _.get(this.path.field, doc) : doc;
        })();
      }
    }
    if (changedProperties.has('items') || changedProperties.has('transform')) {
      this._list = _.flow([assignKeys('key'), ...(this.transform ? [this.transform] : [])])(this.items);
    }
  }
  updateData(path, data) {
    return updateData(this.path.doc, _.join('.', _.compact([this.path.field, path])), data);
  }
  async deleteItem(key) {
    this._processing = true;
    let newItems;
    if (this.array) {
      newItems = _.toArray(this.items);
      newItems.splice(key, 1);
      newItems = {...newItems};
    } else {
      newItems = _.omit(key, this.items);
    }
    await this.updateData('', newItems);
    this.items = newItems;
    this._processing = false;
  }
  async swapItems(index1, index2) {
    this._processing = true;
    const newItems = array.swapItems(index1, index2, _.clone(this.items));
    await this.updateData('', {...newItems});
    this.items = newItems;
    this._processing = false;
  }
  render() {
    return html`
      ${(this.addAtStart ? _.reverse : _.identity)([
        _.isEmpty(this._list) ? (this.emptyTemplate || '') : '',
        repeat(this._list || [], _.get(this.array ? 'uid' : 'key'), (item, listIndex) =>
          html`<hg-list-item
            style=""
            .item=${item}
            .getItemName=${this.getItemName}
            .first=${listIndex === 0}
            .last=${listIndex === _.size(this.items) - 1}
            .noSwap=${!this.array}
            .disableEdit=${this._processing}
            .configure=${this.configure}
            @request-delete=${() => this.deleteItem(item.key)}
            @swap=${async (event) => this.swapItems(item.key, this._list[listIndex + event.detail].key)}
            @update=${(event) => this.updateData(`${item.key}.${event.detail.path}`, event.detail.data)}
            @show-controls-changed=${(event) => {
              this._processing = event.detail;
            }}>
            ${this.itemTemplate(item, this._processing)}
          </hg-list-item>`
        ),
        this.noAdd ? '' : html`<hg-list-add 
          .disable=${this._processing}
          @add=${async () => {
            this._processing = true;
            const newItem = {uid: Date.now()};
            await this.updateData(String(_.size(this.items)), newItem);
            this.items = {...this.items, [_.size(this.items)]: newItem};
            this._processing = false;
        }}>
        </hg-list-add>`
      ])}
    `;
  }
});
