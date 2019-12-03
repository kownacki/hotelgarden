import {LitElement, html, css} from 'lit-element';
import '../../hg-slider.js';

customElements.define('hg-opinions-slider', class extends LitElement {
  static get properties() {
    return {
      opinions: Array,
    };
  }
  static get styles() {
    return css`
      hg-slider {
        width: 800px;
        height: 100%;
      }
    `;
  }
  render() {
    return html`
      <hg-slider
        .items=${this.opinions}
        .template=${(opinion) => html`
          <style>
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
              color: var(--primary-color);
            }
            p {
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
            <h3>${opinion.title}</h3>
            <p>${opinion.text}</p>
            <div class="bottom">
              <span class="author">${opinion.author}</span>, ${opinion.portal}        
            </div>
          </article>
        `}>
      </hg-slider>
    `;
  }
});
