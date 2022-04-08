import {LitElement, html, css} from 'lit';
import {collection, getDocs, query, where} from 'firebase/firestore';
import '../../elements/hg-slider.js';
import {db} from '../../utils/database.js';
import './hg-halls-slider-item.js';

export class HgHallsSlider extends LitElement {
  static properties = {
    type: String, // 'conference' / 'banquet'
    _halls: Array,
  };
  static styles = css`
    :host {
      display: block;
    }
    hg-slider {
      height: 100%;
    }
  `;
  async firstUpdated() {
    const hallsQuerySnapshot = await getDocs(query(collection(db, 'textImage'), where('hallType', '==', this.type)));
    this._halls = hallsQuerySnapshot.docs.map((doc, index) => ({index, ...doc.data()}));
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
