import {LitElement, html, css} from 'lit-element';
import sharedStyles from "../sharedStyles";

customElements.define('hg-review', class extends LitElement {
  static get properties() {
    return {
      review: Object,
      editable: Boolean,
      disableEdit: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
      }
      h3 {
        font-size: 28px;
        font-style: italic;
        margin-top: 0;
      }
      p {
        font-style: italic;
      }
      .bottom {
        margin-top: 30px;
      }
      /* todo do I really have to set it? */
      .bottom hg-list-editable-text  {
        display: inline;
      }
      .author {
        font-weight: 700;
        color: var(--primary-color);
      }
      @media all and (max-width: 599px) {
        h3 {
          font-size: 24px;
          margin-bottom: 15px;
        }
      }
    `];
  }
  render() {
    return html`
      ${this.editable
        ? html`
          <hg-list-editable-text
            float
            id="heading"
            .disabled=${this.disableEdit && !this.shadowRoot.getElementById('heading').showControls}
            .item=${this.review} 
            .field=${'heading'}>
            <h3></h3>
          </hg-list-editable-text>
          <hg-list-editable-text 
            float 
            multiline
            id="text"
            .disabled=${this.disableEdit && !this.shadowRoot.getElementById('text').showControls}
            .item=${this.review} 
            .field=${'text'}>
            <p></p>
          </hg-list-editable-text>
          <p class="bottom">
            <hg-list-editable-text 
              float 
              id="author"
              .disabled=${this.disableEdit && !this.shadowRoot.getElementById('author').showControls}
              .item=${this.review} 
              .field=${'author'}>
              <span class="author"></span>,
            </hg-list-editable-text>
            <hg-list-editable-text 
              float 
              id="platform"
              .disabled=${this.disableEdit && !this.shadowRoot.getElementById('platform').showControls}
              .item=${this.review} 
              .field=${'platform'}>
              <span class="platform"></span>
            </hg-list-editable-text>
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
});
