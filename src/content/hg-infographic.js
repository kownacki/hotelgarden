import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../styles/shared-styles.js'
import {updateImage} from "../utils";
import '../edit/hg-editable-image.js';
import '../edit/hg-editable-text.js';

customElements.define('hg-infographic', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _infographic: Array,
      _dataReady: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._infographic = (await db.doc('infographics/' + this.uid).get()).data();
      this._dataReady = true;
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        max-width: 900px;
        margin: 40px auto;
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        margin: 60px 0;
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
      @media all and (max-width: 719px) {
        .number {
          font-size: 40px;
        }
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
    `];
  }
  render() {
    return html`
      <h2 class="content-heading">Hotel Garden w liczbach</h2>
      <div class="items">
        ${_.map.convert({cap: false})((item, index) => html`
          <div class="item">
            <div class="data">
              <hg-editable-text
                .ready=${this._dataReady}
                float
                .text=${item.number}
                @save=${(event) => db.doc('infographics/' + this.uid).update({[index + '.number']: event.detail})}>
                <div class="number"></div>
              </hg-editable-text>
              <hg-editable-text
                .ready=${this._dataReady}
                float
                .text=${item.string}
                @save=${(event) => db.doc('infographics/' + this.uid).update({[index + '.string']: event.detail})}>
                <div></div>
              </hg-editable-text>
            </div>
            <hg-editable-image
              .src=${_.get('image.url', this._infographic[index])}
              .sizing=${'cover'}
              @save=${async (event) => {
                this._infographic[index].image = await updateImage(
                  'infographics/' + this.uid, 
                  `${index}.image`, 
                  event.detail, 
                  _.get('image.name', this._infographic[index])
                );
              }}>
            </hg-editable-image>
          </div>
        `, this._infographic)}
      </div>
    `;
  }
});
