import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../styles/shared-styles.js'
import '../../elements/hg-slider.js';
import '../../elements/hg-review.js';

customElements.define('hg-reviews-slider', class extends LitElement {
  static get properties() {
    return {
      reviews: Array,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      hg-slider {
        height: 100%;
      }
    `];
  }
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
});
