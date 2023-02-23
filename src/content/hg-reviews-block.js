import {LitElement, html, css, unsafeCSS} from 'lit';
import {when} from 'lit/directives/when.js';
import '../elements/mkwc/hg-editable-image-with-sync.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, getFromDb} from '../utils/database.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import './hg-reviews-block/hg-reviews-slider.js';
import './hg-reviews-block/hg-scores.js';

const maxImageWidth = 480;
const maxImageHeight = 360;

export class HgReviewsBlock extends LitElement {
  _firebaseAuth;
  static properties = {
    uid: String,
    scores: {type: Boolean, reflect: true},
    bookingScores: Object,
    _loggedIn: Boolean,
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
    hg-editable-image-with-sync {
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
    .manage-reviews-info {
      margin-top: 30px;
      text-align: center;
    }
    .manage-reviews-info a {
      font-weight: 400;
      color: var(--secondary-color);
      text-decoration: none;
    }
    .manage-reviews-info a:hover {
      text-decoration: underline;
    }
    hg-scores, hg-editable-image-with-sync {
      display: none;
    }
    :host([scores]) hg-scores {
      display: block;
    }
    :host(:not([scores])) hg-editable-image-with-sync {
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
      :host(:not([scores])) hg-editable-image-with-sync {
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

    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });

    (async () => {
      const allReviews = await getFromDb(createDbPath('reviews/reviews'));
      this._reviews = _.reverse(_.filter((review) => _.includes(this.uid, review.display), _.toArray(allReviews)));
    })();
  }
  render() {
    // <hg-scores .bookingScores=${this.bookingScores}></hg-scores>
    return html`
      <h2 class="content-heading">Nasi goście o nas</h2>
      <div class="container">
        <hg-editable-image-with-sync
          .path=${createDbPath(`images/${this.uid}-reviews-block`)}
          .fit=${'cover'}
          .maxWidth=${maxImageWidth}
          .maxHeight=${maxImageHeight}>
        </hg-editable-image-with-sync>
        <hg-reviews-slider .reviews=${this._reviews}></hg-reviews-slider>
      </div>
      ${when(
        this._loggedIn,
        () => html`
          <div class="manage-reviews-info">
            Zarządzaj opiniami <a href="/opinie" target="_blank">tutaj</a>
          </div>
        `,
      )}
    `;
  }
}
customElements.define('hg-reviews-block', HgReviewsBlock);
