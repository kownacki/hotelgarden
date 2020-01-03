import {LitElement, html, css} from 'lit-element';
import '../../../elements/hg-list/hg-list-editable-text.js';
import '../../../elements/hg-heading.js';

customElements.define('hg-reviews-item', class extends LitElement {
  static get properties() {
    return {
      review: Object,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        padding: 0 20px;
        width: 100%;
        height: 100%;
      }
      hg-heading {
        font-style: italic;
        color: var(--primary-color);
      }
      p {
        font-style: italic;
        font-size: 20px;
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
    `;
  }
  render() {
    return html`
      <hg-list-editable-text float .item=${this.review} .field=${'heading'}>
        <hg-heading center h3></hg-heading>
      </hg-list-editable-text>
      <hg-list-editable-text float multiline .item=${this.review} .field=${'text'}>
        <p></p>
      </hg-list-editable-text>
      <div class="bottom">
        <hg-list-editable-text float .item=${this.review} .field=${'author'}>
          <div class="author"></div>
        </hg-list-editable-text>
        <div class="space">,&nbsp;</div>
        <hg-list-editable-text float .item=${this.review} .field=${'platform'}>
          <div class="platform"></div>
        </hg-list-editable-text>
      </div>

    `;
  }
});
