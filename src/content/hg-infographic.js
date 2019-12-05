import {LitElement, html, css} from 'lit-element';
import '../hg-heading.js';
import {db} from "../utils";

const infographic = [
  {image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`},
  {image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`},
  {image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`},
  {image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`},
  {image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`},
  {image: `https://picsum.photos/id/${_.random(1, 100)}/600/600`},
];

customElements.define('hg-infographic', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _infographic: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._infographic = (await db.doc('infographic/' + this.uid).get()).data();
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 900px;
        margin: 40px auto;
      }
      .items {
        display: flex;
        flex-wrap: wrap;
      }
      .item {
        display: flex;
        flex-direction: column-reverse;
        position: relative;
      }
      .item::after {
        border-right: 20px solid transparent;
        border-bottom: 20px solid var(--paper-grey-200);
        border-left: 20px solid transparent;
        content: '';
        top: calc(50% - 20px);
        left: calc(50% - 20px);
        width: 0;
        height: 0;
        margin: 0 auto;
        position: absolute;
      }
      .item > * {
        height: 150px;
      }
      .data {
        background: var(--paper-grey-200);
        color: var(--primary-color);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        box-sizing: border-box;
        padding: 20px;
      }
      .number {
        font-weight: 300;
        font-size: 50px;
      }
      @media all and (max-width: 399px) {
        .item {
          width: 100%;
        }
      }
      @media all and (min-width: 400px) and (max-width: 719px) {
        .item {
          width: 50%;
        }
        .item:nth-child(even) {
          flex-direction: column;
        }
        .item:nth-child(even)::after {
          top: calc(50%);
          border-top: 20px solid var(--paper-grey-200);
          border-bottom: none;
        }
      }
      @media all and (min-width: 720px) {
        .item {
          width: 33.33%;
        }
        .item:nth-child(2), .item:nth-child(5) {
          flex-direction: column;
        }
        .item:nth-child(2)::after, .item:nth-child(5)::after {;
          top: calc(50%);
          border-top: 20px solid var(--paper-grey-200);
          border-bottom: none;
        }
      }
    `;
  }
  render() {
    return html`
      <hg-heading center>${'Hotel Garden w liczbach'}</hg-heading>
      <div class="items">
        ${_.map.convert({cap: false})((item, index) => html`
          <div class="item">
            <div class="data">
              <hg-editable-text
                float
                .text=${item.number}
                @save=${(event) => db.doc('infographic/' + this.uid).update({[index + '.number']: event.detail})}>
                <div class="number"></div>
              </hg-editable-text>
              <hg-editable-text
                float
                .text=${item.string}
                @save=${(event) => db.doc('infographic/' + this.uid).update({[index + '.string']: event.detail})}>
                <div></div>
              </hg-editable-text>
            </div>
            <iron-image .src=${infographic[index].image} .sizing=${'cover'}></iron-image>
          </div>
        `, this._infographic)}
      </div>
    `;
  }
});
