import {LitElement, html, css} from 'lit';
import {updateData, updateImage} from "../../utils.js";
import sharedStyles from '../../styles/shared-styles.js'
import '../../edit/hg-editable-image.js';
import '../../edit/hg-editable-text.js';

customElements.define('hg-hall-tables', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _hallTables: Array,
      _setOuts: Array,
      _setOutsDoc: String,
      _dataReady: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        margin-bottom: 50px;
      }
      .items {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 800px;
        margin: auto;
        text-align: center;
      }
      .items > * {
        padding: 10px 10px 30px;
        box-sizing: border-box;
        width: 25%;
        min-width: 120px;
      }
      p {
        margin: 8px 0;
      }
    `];
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      //todo refactor ehh....
      (async () => {
        this._hallTables = (await db.doc('hallTables/' + this.uid).get()).data() || {};
      })();
      const hall = (await db.doc('textImage/' + this.uid).get()).data();
      this._setOutsDoc = 'hallTables/setOuts' + _.capitalize(hall.tent ? 'tent' : hall.narrow ? 'narrow' : hall.hallType);
      this._setOuts = (await db.doc(this._setOutsDoc).get()).data() || {};
      this._dataReady = true;
    })();
  }
  async updateImage(index, file) {
    this._setOuts = _.set(
      `${index}.image`,
      await updateImage(this._setOutsDoc, `${index}.image`, file, (_.get(`${index}.image.name`, this._setOuts))),
      this._setOuts,
    );
  }
  render() {
    return html`
      <h3 class="content-heading">Ustawienie stołów</h3>
      <div class="items">
        ${_.map.convert({cap: false})((setOut, index) => html`
          <div>
            <hg-editable-image
              presize
              .src=${_.get(`image.url`, setOut)}
              @save=${(event) => this.updateImage(index, event.detail)}>
            </hg-editable-image>
            <hg-editable-text
              .ready=${this._dataReady}
              .text=${_.get(`name`, setOut)}
              @save=${(event) => updateData(this._setOutsDoc, `${index}.name`, event.detail)}>
              <p></p>
            </hg-editable-text>
            <hg-editable-text
              .ready=${this._dataReady}
              .text=${_.get(`${index}.text1`, this._hallTables)}
              @save=${(event) => updateData('hallTables/' + this.uid, `${index}.text1`, event.detail)}>
              <p class="smaller-text"></p>
            </hg-editable-text>
          </div>
        `, this._setOuts)}
      </div>
    `;
  }
});
