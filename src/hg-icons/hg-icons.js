import {LitElement, html, css} from 'lit-element';
import {db, swapArrayItems} from "../utils.js";
import './hg-icons-add.js';
import './hg-icons-item.js';

customElements.define('hg-icons', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _processing: Boolean,
      _icons: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._icons = _.toArray((await db.collection("iconBlocks").doc(this.uid).get()).data());
    })();
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `;
  }
  render() {
    return html`
      ${_.map.convert({cap: false})((icon, index) => html`
        <hg-icons-item 
          .icon=${icon}
          .last=${index === this._icons.length - 1}
          .disableEdit=${this._processing}
          @request-swap=${async () => {
            this._processing = true;
            swapArrayItems(index, index + 1, this._icons);
            await db.doc('iconBlocks/' + this.uid).set({...this._icons});
            this.requestUpdate();
            this._processing = false;
          }}
        </hg-icons-item>
      `, this._icons)}
      <hg-icons-add
        .icons=${this._icons}
        .uid=${this.uid}
        @icon-added=${() => this.requestUpdate()}>
       </hg-icons-add>
    `;
  }
});
