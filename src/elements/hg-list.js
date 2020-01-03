import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {db, updateData} from "../utils.js";
import './hg-list/hg-list-add.js';

customElements.define('hg-list', class extends LitElement {
  static get properties() {
    return {
      reverse: Boolean,
      doc: String,
      template: Function,
      _items: Array,
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
        box-shadow: 0 0 2px var(--placeholder-color);
        border-radius: 2px;
      }
      hg-list-add {

      }
    `;
  }
  async updateData(path, data) {
    updateData(this.doc, path, data);
  }
  render() {
    return html`
      ${(this.reverse ? _.reverse : _.identity)([
        _.isEmpty(this._items) ? ''
          : repeat(this.reverse ? _.reverse(this._items) : this._items, _.get('uid'), (item, index) => 
            html`<div
              @update=${(event) => this.updateData(`${this.reverse ? this._items.length - index - 1 : index}.${event.detail.path}`, event.detail.data)}>
              ${this.template(item)}
            </div>`
          )
        ,
        html`<hg-list-add @add=${() => {
          const item = {uid: Date.now()};
          this.updateData(this._items.length, item);
          this._items = [...this._items, item];
          this.requestUpdate();
        }}></hg-list-add>`
      ])}
    `;
  }
});
