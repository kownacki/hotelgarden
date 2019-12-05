import {LitElement, html, css} from 'lit-element';
import {db} from "../utils.js";
import '../hg-heading.js';

customElements.define('hg-text-image', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _textImage: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._textImage = (await db.doc('textImage/' + this.uid).get()).data();
    })();
  }
  static get styles() {
    return css`
      :host {
        max-width: 1250px;
        margin: 60px auto;
        padding: 0 25px;
        display: flex;
      }
      iron-image {
        width: 50%;
        height: 400px;
      }
      .content {
        width: 50%;
        padding: 30px;
      }
      hg-heading, p {
        font-size: 20px;
      }
      .buttons {
        margin-top: 40px;
        display: flex;
      }
      a {
        text-decoration: none;
        color: white;
        background: var(--accent-color);
        padding: 10px 20px;
        margin-right: 30px;
      }
    `;
  }
  render() {
    return html`
      <iron-image .src=${_.get('image', this._textImage)} .sizing=${'cover'}></iron-image>
      <div class="content">
         <hg-editable-text
          .text=${_.get('heading', this._textImage)}
          @save=${(event) => db.doc('textImage/' + this.uid).update({'heading': event.detail})}>
          <hg-heading></hg-heading>
        </hg-editable-text>
        <hg-editable-text
          multiline
          .text=${_.get('text', this._textImage)}
          @save=${(event) => db.doc('textImage/' + this.uid).update({'text': event.detail})}>
          <p></p>
        </hg-editable-text>
        <div class="buttons">
          <a href="#">Pulvinar</a>
          <a href="#">Ante ipsum</a>
        </div>       
      </div>
    `;
  }
});
