import {LitElement, html, css} from 'lit-element';
import '../../../elements/hg-list/hg-list-editable-text.js';
import '../../../elements/hg-heading.js';
import sharedStyles from "../../../sharedStyles";

customElements.define('hg-reviews-item', class extends LitElement {
  static get properties() {
    return {
      review: Object,
      disableEdit: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        box-sizing: border-box;
        margin: 10px;
        padding: 1px 20px;
        height: calc(100% - 20px);
        box-shadow: 0 0 2px var(--placeholder-color);
        border-radius: 2px;
        height: 400px;
      }
      hg-heading {
        font-style: italic;
      }
      p {
        font-style: italic;
        text-align: center;
      }
      .bottom {
        margin-top: 30px;
        display: flex;
        justify-content: center;
      }
      .author, .platform, .space {
        font-size: 20px;
      }
      .author {
        font-weight: 700;
        color: var(--primary-color);
      }
    `];
  }
  render() {
    return html`
      <hg-list-editable-text
        float
        id="heading"
        .disabled=${this.disableEdit && !this.shadowRoot.getElementById('heading').showControls}
        .item=${this.review} 
        .field=${'heading'}>
        <hg-heading center h3></hg-heading>
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
      <div class="bottom">
        <hg-list-editable-text 
          float 
          id="author"
          .disabled=${this.disableEdit && !this.shadowRoot.getElementById('author').showControls}
          .item=${this.review} 
          .field=${'author'}>
          <div class="author"></div>
        </hg-list-editable-text>
        <div class="space">,&nbsp;</div>
        <hg-list-editable-text 
          float 
          id="platform"
          .disabled=${this.disableEdit && !this.shadowRoot.getElementById('platform').showControls}
          .item=${this.review} 
          .field=${'platform'}>
          <div class="platform"></div>
        </hg-list-editable-text>
      </div>

    `;
  }
});
