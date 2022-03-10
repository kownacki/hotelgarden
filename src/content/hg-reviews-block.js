import {LitElement, html, css, unsafeCSS} from 'lit';
import '../elements/mkwc/hg-image.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';
import './hg-reviews-block/hg-reviews-slider.js';
import './hg-reviews-block/hg-scores.js';

const maxImageWidth = 480;
const maxImageHeight = 360;

export class HgReviewsBlock extends LitElement {
  static properties = {
    uid: String,
    scores: {type: Boolean, reflect: true},
    bookingScores: Object,
    _reviews: Array,
  };
  static styles = [sharedStyles, css`
    :host {
      ${unsafeCSS(`
        --max-image-width: ${maxImageWidth}px;
        --max-image-height: ${maxImageHeight}px;
      `)}
      display: block;
      margin: 60px auto;
    }
    .container {
      display: flex;
      margin: 60px auto 0;
      flex-direction: row;
      justify-content: center;
    }
    hg-scores {
      margin: 0 20px;
    }
    hg-image {
      width: var(--max-image-width);
      max-width: 100%;
      height: var(--max-image-height);
      margin: 0 20px;
    }
    hg-reviews-slider {
      display: block;
      width: 580px;
      max-width: 100%;
      height: var(--max-image-height);
      margin: 0 20px;
    }
    hg-scores, hg-image {
      display: none;
    }
    :host([scores]) hg-scores {
      display: block;
    }
    :host(:not([scores])) hg-image {
      display: block;
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
        <hg-scores .bookingScores=${this.bookingScores}></hg-scores>
        <hg-image 
          .path=${staticProp({doc: `images/${this.uid}-reviews-block`})}
          .fit=${'cover'}
          .maxWidth=${maxImageWidth}
          .maxHeight=${maxImageHeight}>
        </hg-image>
        <hg-reviews-slider .reviews=${this._reviews}></hg-reviews-slider>
      </div>
    `;
  }
}
customElements.define('hg-reviews-block', HgReviewsBlock);
