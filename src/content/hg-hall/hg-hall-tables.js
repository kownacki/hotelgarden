import {LitElement, html, css, unsafeCSS} from 'lit';
import {updateData} from "../../utils.js";
import sharedStyles from '../../styles/shared-styles.js'
import {firebaseUtils as fb} from '../../utils/firebase.js';
import '../../edit/hg-editable-text.js';
import '../../elements/mkwc/hg-image.js';

const maxImageWidth = 200;

export class HgHallTables extends LitElement {
  static properties = {
    uid: String,
    _hallTables: Object,
    _setOuts: Object,
    _setOutsDoc: String,
    _dataReady: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      ${unsafeCSS(`
        --max-image-width: ${maxImageWidth}px;
      `)}
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
  async firstUpdated() {
    //todo refactor ehh....
    (async () => {
      this._hallTables = (await db.doc('hallTables/' + this.uid).get()).data() || {};
    })();
    const hall = (await db.doc('textImage/' + this.uid).get()).data();
    this._setOutsDoc = 'hallTables/setOuts' + _.capitalize(hall.tent ? 'tent' : hall.narrow ? 'narrow' : hall.hallType);
    this._setOuts = (await db.doc(this._setOutsDoc).get()).data() || {};
    this._dataReady = true;
  }
  async updateImage(index, file) {
    this._setOuts = _.set(
      `${index}.image`,
      await fb.updateImage(fb.path(this._setOutsDoc, `${index}.image`), file, (_.get(`${index}.image.name`, this._setOuts))),
      this._setOuts,
    );
  }
  render() {
    return html`
      <h3 class="content-heading">Ustawienie stołów</h3>
      <div class="items">
        ${_.map.convert({cap: false})((setOut, index) => html`
          <div>
            <hg-image
              .noGet=${true}
              .noUpdate=${true}
              .image=${setOut.image}
              .ready=${this._dataReady}
              .maxWidth=${maxImageWidth}
              .presize=${true}
              @image-uploaded=${(event) => {
                this.updateImage(index, event.detail);
              }}>
            </hg-image>
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
}
customElements.define('hg-hall-tables', HgHallTables);
