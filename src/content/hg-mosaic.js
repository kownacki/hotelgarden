import {LitElement, html, css} from 'lit-element';
import {db} from "../utils.js";
import '../hg-heading.js';
import '../edit/hg-editable-text.js';

customElements.define('hg-mosaic', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      _mosaic: Object,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._mosaic = (await db.doc('mosaics/' + this.uid).get()).data();
    })();
  }
  static get styles() {
    return css`
      :host {
        max-width: 1250px;
        margin: 0 auto 30px;
        padding: 25px;
        display: block;
        overflow: auto;
      }
      .left {
        width: calc(40% - 1px);
        margin-right: 1px;
        float: left;
      }
      .right {
        width: 60%;
        float: right;
      }
      .content {
        margin: 40px;
      }
      img {
        width: 100%;
      }
      p {
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
      a:last-child {
        margin-right: 0;
      }
      @media all and (max-width: 900px) {
        .left, .right {
          float: none;
          width: 100%;
        }
      }
    `;
  }
  render() {
    return html`
      <div class="right">
        <div class="content">
          <hg-editable-text
            .text=${_.get('primary.heading', this._mosaic)}
            @save=${(event) => db.doc('mosaics/' + this.uid).update({'primary.heading': event.detail})}>
            <hg-heading></hg-heading>
          </hg-editable-text>
          <hg-editable-text
            multiline
            .text=${_.get('primary.text', this._mosaic)}
            @save=${(event) => db.doc('mosaics/' + this.uid).update({'primary.text': event.detail})}>
            <p></p>
          </hg-editable-text>
          <div class="buttons">
            <a href="#">Pulvinar</a>
            <a href="#">Ante ipsum</a>
          </div>       
        </div>
      </div>
      <div class="left">
        <img .src=${_.get('primary.image', this._mosaic)}>
        <div class="content">
           <hg-editable-text
            .text=${_.get('secondary.heading', this._mosaic)}
            @save=${(event) => db.doc('mosaics/' + this.uid).update({'secondary.heading': event.detail})}>
            <hg-heading></hg-heading>
          </hg-editable-text>
          <hg-editable-text
            multiline
            .text=${_.get('secondary.text', this._mosaic)}
            @save=${(event) => db.doc('mosaics/' + this.uid).update({'secondary.text': event.detail})}>
            <p></p>
          </hg-editable-text>
          <div class="buttons">
            <a href="#">Arcu dictum varius</a>
          </div>
        </div>
      </div>
      <div class="right">
        <img .src=${_.get('secondary.image', this._mosaic)}>
      </div>
    `;
  }
});
