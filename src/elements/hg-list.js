import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {db, updateData} from "../utils.js";
import './hg-list/hg-list-item.js';
import './hg-list/hg-list-add.js';

customElements.define('hg-list', class extends LitElement {
  static get properties() {
    return {
      reverse: Boolean,
      doc: String,
      template: Function,
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
        width: 31.33%;
        height: 400px;
        margin: 1%;
      }
      div {

      }
      hg-list-add {

      }
    `;
  }
  async updateData(path, data) {
    updateData(this.doc, path, data);
  }
  correctIndex(index) {
    return this.reverse ? this._items.length - index - 1 : index;
  }
  render() {
    return html`
      ${(this.reverse ? _.reverse : _.identity)([
        _.isEmpty(this._items) ? ''
          : repeat(this.reverse ? _.reverse(this._items) : this._items, _.get('uid'), (item, index) => 
            html`<hg-list-item
              @request-delete=${async () => {
                this._processing = true;
                const newItems = [...this._items];
                newItems.splice(this.correctIndex(index), 1);
                await db.doc(this.doc).set({...newItems});
                this._items = newItems;
                this.requestUpdate();
                this._processing = false;
              }}
              @update=${(event) => this.updateData(`${this.correctIndex(index)}.${event.detail.path}`, event.detail.data)}>
              ${this.template(item)}
            </hg-list-item>`
          )
        ,
        html`<hg-list-add @add=${() => {
          const newItem = {uid: Date.now()};
          this.updateData(this._items.length, newItem);
          this._items = [...this._items, newItem];
          this.requestUpdate();
        }}></hg-list-add>`
      ])}
    `;
  }
});
