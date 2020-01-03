import {LitElement, html, css} from 'lit-element';
import {db} from "../utils.js";
import '../elements/hg-heading.js';
import './hg-reviews-block/hg-scores.js';
import './hg-reviews-block/hg-reviews-slider.js';

customElements.define('hg-reviews-block', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      scores: {type: Boolean},
      _reviews: Array,
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
      hg-reviews-slider {
        flex: 1;
      }
    `;
  }
  constructor() {
    super();
    (async () => {
      this._reviews = _.reverse(_.filter((review) => _.includes(this.uid, review.display), _.toArray((await db.doc('reviews/reviews').get()).data())));
    })();
  }
  render() {
    return html`
      <hg-heading center>${'Nasi goście o nas'}</hg-heading>
      <div class="container">
        <hg-scores></hg-scores>
        <hg-image sizing=${'cover'} .uid=${this.uid + '-reviews-block'}></hg-image>
        <hg-reviews-slider .reviews=${this._reviews}></hg-reviews-slider>
      </div>
    `;
  }
});
