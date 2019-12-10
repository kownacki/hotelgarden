import {LitElement, html, css} from 'lit-element';
import {db} from "../../utils.js";
import '../../elements/hg-heading.js';
import './hg-scores.js';
import './hg-opinions-slider.js';

customElements.define('hg-opinions-block', class extends LitElement {
  static get properties() {
    return {
      _opinions: Array,
      scores: {type: Boolean},
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        padding: 0 20px;
        margin: 80px auto;
      }
      .container {
        display: flex;
        justify-content: center;
        height: 300px;
      }
      hg-scores, hg-image {
        display: none;
        margin-right: 40px;
      }
      :host([scores]) hg-scores {
        display: block;
      }
      :host(:not([scores])) hg-image {
        width: 50%;
        display: block;
      }
      hg-opinions-slider {
        flex: 1;
      }
    `;
  }
  constructor() {
    super();
    (async () => {
      this._opinions = await _.map(_.method('data'), _.reverse((await db.collection('opinions').get()).docs));
    })();
  }
  render() {
    return html`
      <hg-heading center>${'Nasi goście o nas'}</hg-heading>
      <div class="container">
        <hg-scores></hg-scores>
        <hg-image sizing=${'cover'} .uid="opinions"></hg-image>
        <hg-opinions-slider .opinions=${this._opinions}></hg-opinions-slider>
      </div>
    `;
  }
});
