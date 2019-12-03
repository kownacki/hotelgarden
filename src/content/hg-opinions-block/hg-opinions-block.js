import {LitElement, html, css} from 'lit-element';
import {db} from "../../utils.js";
import '../../hg-heading.js';
import './hg-scores.js';
import './hg-opinions-slider.js';

customElements.define('hg-opinions-block', class extends LitElement {
  static get properties() {
    return {
      _opinions: Array,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .container {
        display: flex;
        justify-content: center;
      }
      hg-scores {
        margin-right: 40px;
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
      <hg-heading .text=${'Nasi goście o nas'} center></hg-heading>
      <div class="container">
        <hg-scores></hg-scores>
        <hg-opinions-slider .opinions=${this._opinions}></hg-opinions-slider>
      </div>
    `;
  }
});
