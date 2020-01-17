import {LitElement, html, css} from 'lit-element';
import {db, array} from "../utils.js";
import './hg-icons/hg-icons-add.js';
import './hg-icons/hg-icons-item.js';
import '../elements/hg-content-label.js';

customElements.define('hg-icons', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      empty: {type: Boolean, reflect: true},
      _processing: Boolean,
      _icons: Array,
      _dataReady: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._icons = _.toArray((await db.collection("iconBlocks").doc(this.uid).get()).data());
      this._dataReady = true;
    })();
  }
  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 60px auto;
        padding: 0 10px;
        min-height: 131px;
        max-width: 1200px;
      }
      :host(:hover) hg-content-label {
        display: block;
      }
      hg-icons-add {
        display: none;
      }
      :host(:hover) hg-icons-add, hg-icons-add[opened] {
        display: block ;
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
  updated(changedProperties) {
    if (changedProperties.has('_icons')) {
      this.empty = _.isEmpty(this._icons);
    }
  }
  render() {
    return html`
      ${_.map.convert({cap: false})((icon, index) => html`
        <hg-icons-item
          .dataReady=${this._dataReady}
          .icon=${icon}
          .first=${index === 0}
          .last=${index === this._icons.length - 1}
          .disableEdit=${this._processing}
          @request-delete=${async () => {
            this._processing = true;
            const newIcons = [...this._icons];
            newIcons.splice(index, 1);
            await db.doc('iconBlocks/' + this.uid).set({...newIcons});
            this._icons = newIcons;
            this.requestUpdate();
            this._processing = false;
          }}
          @request-edit=${async (event) => {
            this._processing = true;
            await db.doc('iconBlocks/' + this.uid).update({[`${index}.text`]: event.detail});
            icon.text = event.detail;
            this.requestUpdate();
            this._processing = false;
          }}
          @show-controls-changed=${(event) => {
            this._processing = event.detail;
          }}
          @request-swap=${async (event) => {
            this._processing = true;
            const newIcons = array.swapItems(index, index + event.detail, [...this._icons]);
            await db.doc('iconBlocks/' + this.uid).set({...newIcons});
            this._icons = newIcons;
            this.requestUpdate();
            this._processing = false;
          }}>
        </hg-icons-item>
      `, this._icons)}
      <hg-icons-add
        .icons=${this._icons}
        .uid=${this.uid}
        .disable=${this._processing}
        @opened-changed=${(event) => {
          this._processing = event.detail;
        }}
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
