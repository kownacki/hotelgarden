import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {array, db, updateData} from "../utils.js";
import './hg-list/hg-list-item.js';
import './hg-list/hg-list-add.js';

customElements.define('hg-list', class extends LitElement {
  static get properties() {
    return {
      reverse: Boolean,
      doc: String,
      template: Function,
      configure: Object,
      _items: Array,
      _processing: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._items = _.toArray((await db.doc(this.doc).get()).data());
    })();
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
      }
      :host > * {
        width: 33.33%;
        height: 400px;
      }
      div {

      }
      hg-list-add {

      }
    `;
  }
  async updateData(path, data) {
    return updateData(this.doc, path, data);
  }
  correctIndex(index) {
    return this.reverse ? this._items.length - index - 1 : index;
  }
  async deleteItem(index) {
    this._processing = true;
    const newItems = [...this._items];
    newItems.splice(index, 1);
    await db.doc(this.doc).set({...newItems});
    this._items = newItems;
    this.requestUpdate();
    this._processing = false;
  }
  async swapItems(index, direction) {
    this._processing = true;
    const newItems = array.swapItems(index, index + direction, [...this._items]);
    await db.doc(this.doc).set({...newItems});
    this._items = newItems;
    this.requestUpdate();
    this._processing = false;
  }
  render() {
    return html`
      ${(this.reverse ? _.reverse : _.identity)([
        _.isEmpty(this._items) ? ''
          : repeat(this.reverse ? _.reverse(this._items) : this._items, _.get('uid'), (item, index) => 
            html`<hg-list-item
              .item=${item}
              .first=${index === 0}
              .last=${index === this._items.length - 1}
              .disableEdit=${this._processing}
              .configure=${this.configure}
              @request-delete=${() => this.deleteItem(this.correctIndex(index))}
              @swap=${async (event) => this.swapItems(this.correctIndex(index), this.reverse ? event.detail*-1 : event.detail)}
              @update=${(event) => this.updateData(`${this.correctIndex(index)}.${event.detail.path}`, event.detail.data)}
              @show-controls-changed=${(event) => {
                this._processing = event.detail;
              }}>
              ${this.template(item, this._processing)}
            </hg-list-item>`
          )
        ,
        html`<hg-list-add 
          .disable=${this._processing}
          @add=${async () => {
            this._processing = true;
            const newItem = {uid: Date.now()};
            await this.updateData(this._items.length, newItem);
            this._items = [...this._items, newItem];
            this.requestUpdate();
            this._processing = false;
        }}>
        </hg-list-add>`
      ])}
    `;
  }
});
