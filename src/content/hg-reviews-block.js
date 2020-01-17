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
        margin: 60px auto -40px;
      }
      .container {
        display: flex;
        flex-direction: row-reverse;
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
        height: 300px;
      }
      hg-reviews-slider {
        display: block;
        width: 600px;
        max-width: 100%;
        height: 300px;
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
          padding: 0 20px;
          max-width: calc(100% - 40px);
          margin: auto;
        }
      }
      @media all and (max-width: 959px) {
        :host {
          margin: 60px auto;
        }
        .container {
          display: block;
        }
        hg-reviews-slider {
          margin: 40px auto 0;
        }
      }
      @media all and (max-width: 599px) {
        :host(:not([scores])) hg-image {
          height: 280px;
        }
      }
      @media all and (max-width: 479px) {
        :host(:not([scores])) hg-image {
          height: 200px;
        }
        hg-reviews-slider {
          height: 340px;
        }
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
        <hg-reviews-slider .reviews=${this._reviews}></hg-reviews-slider>
        <hg-scores></hg-scores>
        <hg-image sizing=${'cover'} .uid=${this.uid + '-reviews-block'}></hg-image>
      </div>
    `;
  }
});
