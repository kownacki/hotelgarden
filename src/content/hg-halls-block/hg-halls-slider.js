import {LitElement, html, css} from 'lit-element';
import {db, updateData} from "../../utils.js";
import '../../edit/hg-editable-text.js'
import '../../elements/hg-slider.js';
import './hg-halls-slider-item.js';

customElements.define('hg-halls-slider', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _hallsBlock: Array,
      _dataReady: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      hg-slider {
        height: 100%;
      }
    `;
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._hallsBlock = _.map.convert({cap: false})(
        (hall, index) => ({index, ...hall}),
        (await db.doc('hallsBlocks/' + this.uid).get()).data(),
      ) || {};
      this._dataReady = true;
    })();
  }
  async updateData(path, data) {
    updateData('hallsBlocks/' + this.uid, path, data);
  }
  render() {
    return html`
      <hg-slider
        .items=${this._hallsBlock}
        .template=${(hall) => html`<hg-halls-slider-item .uid=${this.uid} .hall=${hall} .dataReady=${this._dataReady}></hg-halls-slider-item>`}>
      </hg-slider>
    `;
  }
});
