import {LitElement, html, css} from 'lit-element';
import {db, updateData} from "../../utils.js";
import '../../edit/hg-editable-text.js'
import '../../elements/hg-slider.js';
import './hg-halls-slider-item.js';

customElements.define('hg-halls-slider', class extends LitElement {
  static get properties() {
    return {
      type: String, // 'conference' / 'banquet'
      _halls: Array,
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
      this._halls = _.map.convert({cap: false})(
        (doc, index) => ({index, ...doc.data()}),
        (await firebase.firestore().collection('textImage').where("hallType", "==", this.type).get()).docs
      );
    })();
  }
  async updateData(path, data) {
    updateData('hallsBlocks/' + this.uid, path, data);
  }
  render() {
    return html`
      <hg-slider
        .items=${this._halls}
        .template=${(hall) => html`<hg-halls-slider-item .hall=${hall}></hg-halls-slider-item>`}>
      </hg-slider>
    `;
  }
});
