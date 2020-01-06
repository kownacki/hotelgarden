import {LitElement, html, css} from 'lit-element';
import '../../elements/hg-slider.js';

customElements.define('hg-reviews-slider', class extends LitElement {
  static get properties() {
    return {
      reviews: Array,
    };
  }
  static get styles() {
    return css`
      hg-slider {
        height: 100%;
      }
    `;
  }
  render() {
    return html`
      <hg-slider
        .items=${this.reviews}
        .template=${(review) => html`
          <style>
          /*todo separate element with sharedStyles */
            article {
              padding: 0 60px;
              display: flex;
              flex-direction: column;
            }
            h3 {
              margin-top: 0;
              font-size: 35px;
              font-weight: 300;
              font-style: italic;
            }
            p {
              line-height: 1.4em;
              font-style: italic;
              font-size: 20px;
              margin-top: 0;
            }
            .bottom {
              font-size: 20px;
            }
            .author {
              font-weight: 700;
              color: var(--primary-color);    
            }
          </style>
          <article>
            <h3>${review.heading}</h3>
            <p>${review.text}</p>
            <div class="bottom">
              <span class="author">${review.author}</span>, ${review.platform}        
            </div>
          </article>
        `}>
      </hg-slider>
    `;
  }
});
