import {LitElement, html, css} from 'lit';
import sharedStyles from '../../styles/shared-styles.js'
import '../../elements/hg-slider.js';
import '../../elements/hg-review.js';

export class HgReviewsSlider extends LitElement {
  static properties = {
    reviews: Array,
  };
  static styles = [sharedStyles, css`
    hg-slider {
      height: 100%;
    }
  `];
  render() {
    return html`
      <hg-slider
        .items=${this.reviews}
        .template=${(review) => html`
          <hg-review style="padding: 0 50px;" .review=${review}></hg-review>
        `}>
      </hg-slider>
    `;
  }
}
customElements.define('hg-reviews-slider', HgReviewsSlider);
