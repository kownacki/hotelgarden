import {LitElement, html, css} from 'lit-element';
import {staticProp} from "../utils.js";
import sharedStyles from "../styles/shared-styles";
import '../elements/hg-image.js';
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
    return [sharedStyles, css`
      :host {
        display: block;
        margin: 60px auto;
      }
      .container {
        display: flex;
        margin: 60px auto 0;
        flex-direction: row;
        justify-content: center;
      }
      hg-scores, hg-image {
        display: none;
        margin: 0 20px;
      }
      :host([scores]) hg-scores {
        display: block;
      }
      :host(:not([scores])) hg-image {
        display: block;
        width: 480px;
        max-width: 100%;
      }
      hg-reviews-slider {
        display: block;
        width: 580px;
        max-width: 100%;
        height: 360px;
        margin: 0 20px;
      }
      @media all and (max-width: 1159px) {
        :host(:not([scores])) {
          margin: 60px auto;
        }
        :host(:not([scores])) .container {
          display: block;
        }
        :host(:not([scores])) hg-reviews-slider {
          margin: 40px auto 20px ;
        }
        :host(:not([scores])) hg-image {
          display: none;
        }
      }
      @media all and (max-width: 959px) {
        .container {
          margin: 20px auto 0;
          display: block;
        }
        hg-reviews-slider {
          height: 320px;
          margin: 40px auto 0;
        }
      }
      @media all and (max-width: 599px) {
        hg-reviews-slider {
          height: 320px;
        }
      }
      @media all and (max-width: 479px) {
        hg-reviews-slider {
          height: 350px;
        }
      }
      @media all and (max-width: 399px) {
        hg-reviews-slider {
          height: 420px;
        }
      }
    `];
  }
  constructor() {
    super();
    (async () => {
      this._reviews = _.reverse(_.filter((review) => _.includes(this.uid, review.display), _.toArray((await db.doc('reviews/reviews').get()).data())));
    })();
  }
  render() {
    return html`
      <h2 class="content-heading">Nasi goście o nas</h2>
      <div class="container">
        <hg-scores></hg-scores>
        <hg-image sizing=${'cover'} .path=${staticProp({doc: `images/${this.uid}-reviews-block`})}></hg-image>
        <hg-reviews-slider .reviews=${this._reviews}></hg-reviews-slider>
      </div>
    `;
  }
});
