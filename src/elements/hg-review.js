import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import './hg-list-old/hg-list-old-editable-text.js';

export class HgReview extends LitElement {
  static properties = {
    review: Object,
    editable: Boolean,
    disableEdit: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      box-sizing: border-box;
    }
    h3 {
      margin: 0;
      font-size: 30px;
      font-style: italic;
    }
    p {
      font-style: italic;
    }
    .main-text-container {
      margin: 20px 0;
    }
    .main-text {
      margin: 0;
    }
    .bottom {
      margin: 0;
    }
    .bottom hg-list-old-editable-text  {
      display: inline-block;
    }
    .author {
      display: inline-block;
      font-weight: 700;
      color: var(--primary-color);
    }
    .platform {
      display: inline-block;
    }
    @media all and (max-width: 959px) {
      h3 {
        font-size: 27px;
      }
    }
    @media all and (max-width: 599px) {
      h3 {
        font-size: 24px;
      }
      :host {
        border: none;
        border-top: solid 1px var(--divider-color);
        border-bottom:  solid 1px var(--divider-color);
        border-radius: 0;
      }
    }
  `];
  constructor() {
    super();
    this.classList.add('fixed-height-element');
  }
  render() {
    return html`
      ${this.editable
        ? html`
          <hg-list-old-editable-text
            float
            id="heading"
            .disabled=${this.disableEdit && !this.shadowRoot.getElementById('heading').showControls}
            .item=${this.review} 
            .field=${'heading'}>
            <h3></h3>
          </hg-list-old-editable-text>
          <div class="main-text-container">
            <hg-list-old-editable-text
              float
              multiline
              id="text"
              .disabled=${this.disableEdit && !this.shadowRoot.getElementById('text').showControls}
              .item=${this.review}
              .field=${'text'}>
              <p class="main-text smaller-text"></p>
            </hg-list-old-editable-text>   
          </div>
          <p class="bottom">
            <hg-list-old-editable-text 
              float 
              id="author"
              .disabled=${this.disableEdit && !this.shadowRoot.getElementById('author').showControls}
              .item=${this.review} 
              .field=${'author'}>
              <span class="author smaller-text"></span>,&nbsp;
            </hg-list-old-editable-text>
            <hg-list-old-editable-text 
              float 
              id="platform"
              .disabled=${this.disableEdit && !this.shadowRoot.getElementById('platform').showControls}
              .item=${this.review} 
              .field=${'platform'}>
              <span class="platform smaller-text"></span>
            </hg-list-old-editable-text>
          </p>`
        : html`
          <h3>${this.review.heading}</h3>
          <p>${this.review.text}</p>
          <p class="bottom">
            <span class="author">${this.review.author}</span>, <span class="platform">${this.review.platform}</span>   
          </div>
      `}
    `;
  }
}
customElements.define('hg-review', HgReview);
