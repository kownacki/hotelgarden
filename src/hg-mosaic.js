import {LitElement, html, css} from 'lit-element';
import {db} from "./utils.js";

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
      this._mosaic = (await db.collection("mosaics").doc(this.uid).get()).data();
    })();
  }
  static get styles() {
    return css`
      :host {
        font-size: 20px;
        max-width: 1250px;
        margin: 30px auto 0;
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
      h2 {
        margin-top: 0;
        font-weight: 300;
        font-size: 40px;
        text-transform: uppercase;
      }
      .content {
        margin: 40px;
      }
      img {
        width: 100%;
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
          <h2>${_.get('primary.heading', this._mosaic)}</h2>
          <p>${_.get('primary.text', this._mosaic)}</p>   
          <div class="buttons">
            <a href="#">Pulvinar</a>
            <a href="#">Ante ipsum</a>
          </div>       
        </div>
      </div>
      <div class="left">
        <img .src=${_.get('primary.image', this._mosaic)}>
        <div class="content">
          <h2>${_.get('secondary.heading', this._mosaic)}</h2>
          <p>${_.get('secondary.text', this._mosaic)}</p>
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
