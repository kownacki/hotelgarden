import {LitElement, html, css} from 'lit';
import '../../elements/hg-slider.js';
import './hg-halls-slider-item.js';

export class HgHallsSlider extends LitElement {
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
  render() {
    return html`
      <hg-slider
        .items=${this._halls}
        .template=${(hall) => html`<hg-halls-slider-item .hall=${hall}></hg-halls-slider-item>`}>
      </hg-slider>
    `;
  }
}
customElements.define('hg-halls-slider', HgHallsSlider);
