import {LitElement, html, css, unsafeCSS} from 'lit';
import '../../edit/hg-editable-text.js';
import '../../elements/mkwc/hg-editable-image.js';
import sharedStyles from '../../styles/shared-styles.js'
import {DbPath, createDbPath, getFromDb, updateDataOrImageInObjectInDb} from '../../utils/database.js';
import {ObjectDbSyncController} from '../../utils/ObjectDbSyncController.js';

const maxImageWidth = 200;

export class HgHallTables extends LitElement {
  _hallTablesObjectDbSync;
  _setOutsObjectDbSync;
  static properties = {
    uid: String,
    _hallTablesPath: DbPath,
    _hallTables: Object,
    _hallTablesReady: Boolean,
    _setOutsPath: DbPath,
    _setOuts: Object,
    _setOutsReady: Boolean,
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
  constructor() {
    super();
    this._hallTablesObjectDbSync = new ObjectDbSyncController(
      this,
      {
        getObject: async (path) => await getFromDb(path) || {},
        updateField: async (objectPath, dataPath, {type, data}, oldData, object) => {
          return updateDataOrImageInObjectInDb(type, objectPath, dataPath, data, object);
        },
        onDataReadyChange: (ready) => this._hallTablesReady = ready,
        onDataChange: (hallTables) => this._hallTables = hallTables,
      },
    );
    this._setOutsObjectDbSync = new ObjectDbSyncController(
      this,
      {
        getObject: async (path) => await getFromDb(path) || {},
        updateField: async (objectPath, dataPath, {type, data}, oldData, object) => {
          return updateDataOrImageInObjectInDb(type, objectPath, dataPath, data, object);
        },
        onDataReadyChange: (ready) => this._setOutsReady = ready,
        onDataChange: (setOuts) => this._setOuts = setOuts,
      },
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._hallTablesPath = createDbPath(`hallTables/${this.uid}`);
      this._hallTablesObjectDbSync.setPath(this._hallTablesPath);

      const hall = await getFromDb(createDbPath(`textImage/${this.uid}`));
      this._setOutsPath = createDbPath(`hallTables/setOuts${_.capitalize(hall.tent ? 'tent' : hall.narrow ? 'narrow' : hall.hallType)}`);
      this._setOutsObjectDbSync.setPath(this._setOutsPath);
    }
  }
  render() {
    return html`
      <h3 class="content-heading">Ustawienie stołów</h3>
      <div class="items">
        ${_.map.convert({cap: false})((setOut, index) => html`
          <div>
            <hg-editable-image
              .src=${setOut.image?.url}
              .ready=${this._setOutsReady}
              .maxWidth=${maxImageWidth}
              .presize=${true}
              @image-uploaded=${({detail: blob}) => {
                this._setOutsObjectDbSync.requestFieldUpdate(`${index}.image`, {type: 'image', data: blob});
              }}>
            </hg-editable-image>
            <hg-editable-text
              .ready=${this._setOutsReady}
              .text=${setOut.name}
              @save=${({detail: text}) => {
                this._setOutsObjectDbSync.requestFieldUpdate(`${index}.name`, {type: 'data', data: text});
              }}>
              <p></p>
            </hg-editable-text>
            <hg-editable-text
              .ready=${this._hallTablesReady}
              .text=${_.get(`${index}.text1`, this._hallTables)}
              @save=${({detail: text}) => {
                this._hallTablesObjectDbSync.requestFieldUpdate(`${index}.text1`, {type: 'data', data: text});
              }}>
              <p class="smaller-text"></p>
            </hg-editable-text>
          </div>
        `, this._setOuts)}
      </div>
    `;
  }
}
customElements.define('hg-hall-tables', HgHallTables);
