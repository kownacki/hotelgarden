import {LitElement, html, css} from 'lit-element';
import {db, array, staticProp} from "../utils.js";
import './hg-icons/hg-icons-add.js';
import './hg-icons/hg-icons-item.js';
import '../elements/hg-content-label.js';
import '../elements/hg-list.js';

customElements.define('hg-icons', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      empty: {type: Boolean, reflect: true},
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        margin: 60px auto;
        padding: 0 10px;
        max-width: 1200px;
      }
      hg-list {
        min-height: 131px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
      :host(:hover) hg-content-label {
        display: block;
      }
      :host([empty]) {
        background: rgba(var(--placeholder-color-rgb), 0.5);
      }
      @media all and (max-width: 599px) {
        :host {
          margin: 40px auto;
        }
      }
    `;
  }
  render() {
    return html`
      <hg-list
        .array=${true}
        .path=${staticProp({doc: 'iconBlocks/' + this.uid})}
        .getItemName=${() => 'ikonę'}
        .itemTemplate=${(icon, index, disableEdit) => html`
          <hg-icons-item .icon=${icon} .disableEdit=${disableEdit}></hg-icons-item>
        `}
        .onAdd=${async (newItem) => {
          const addResult = await this.shadowRoot.getElementById('add').getIcon();
          return addResult 
            ? {...newItem, ...addResult}
            : false;
        }}
        @items-changed=${(event) => this.empty = _.isEmpty(event.detail)}>
      </hg-list>
      <hg-icons-add
        id="add"
        @request-add=${async (event) => {
          this._processing = true;
          await db.doc('iconBlocks/' + this.uid).set({[this._icons.length]: event.detail}, {merge: true});
          this._icons = [...this._icons, event.detail];
          this.requestUpdate();
          this._processing = false;
        }}>
      </hg-icons-add>
      <hg-content-label .name=${'Ikony'}></hg-content-label>
    `;
  }
});
