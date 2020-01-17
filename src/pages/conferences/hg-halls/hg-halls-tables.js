import {LitElement, html, css} from 'lit-element';
import '../../../elements/hg-heading.js';
import '../../../edit/hg-editable-image.js';
import '../../../edit/hg-editable-text.js';
import {db, updateData, updateImage} from "../../../utils.js";

customElements.define('hg-halls-tables', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _hallsTables: Array,
      _setOuts: Array,
      _dataReady: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 50px;
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 1000px;
        margin: auto;
        text-align: center;
      }
      .items > * {
        padding: 10px 10px 30px;
        box-sizing: border-box;
        width: 25%;
        min-width: 240px;
      }
      p {
        margin: 10px 0;
      }
      p.bigger {
        font-size: 25px;
      }
      @media all and (max-width: 959px) {
        :host {
          display: block;
          margin-bottom: 20px;
        }
      }
      @media all and (max-width: 479px) {
        .items > * {
          width: 50%;
          min-width: auto;
        }
      }
    `;
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._setOuts = (await db.doc('hallsTables/setOuts').get()).data() || {};
      this._hallsTables = (await db.doc('hallsTables/' + this.uid).get()).data() || {};
      this._dataReady = true;
    })();
  }
  async updateImage(index, file) {
    this._setOuts = _.set(
      `${index}.image`,
      await updateImage('hallsTables/setOuts', `${index}.image`, file, (_.get(`${index}.image.name`, this._setOuts))),
      this._setOuts,
    );
  }
  render() {
    return html`
      <hg-heading center h3>${'Ustawienie stołów'}</hg-heading>
      <div class="items">
        ${_.map((index) => html`
          <div>
            <hg-editable-image
              presize
              .src=${_.get(`${index}.image.url`, this._setOuts)}
              @save=${(event) => this.updateImage(index, event.detail)}>
            </hg-editable-image>
            <hg-editable-text
              .ready=${this._dataReady}
              .text=${_.get(`${index}.name`, this._setOuts)}
              @save=${(event) => updateData('hallsTables/setOuts', `${index}.name`, event.detail)}>
              <p class='bigger'></p>
            </hg-editable-text>
            <hg-editable-text
              .ready=${this._dataReady}
              .text=${_.get(`${index}.text1`, this._hallsTables)}
              @save=${(event) => updateData('hallsTables/' + this.uid, `${index}.text1`, event.detail)}>
              <p></p>
            </hg-editable-text>
          </div>
        `, [0, 1, 2, 3])}
      </div>
    `;
  }
});
