import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import {DbPath, createDbPath, getFromDb, updateDataOrImageInObjectInDb} from '../utils/database.js';
import {ObjectDbSyncController} from '../utils/ObjectDbSyncController.js';
import '../edit/hg-editable-text.js';

export class HgQuote extends LitElement {
  _objectDbSync;
  static properties = {
    uid: String,
    _path: DbPath,
    _quote: Object,
    _ready: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      margin: 80px auto;
      max-width: 500px;
      padding: 0 100px;
      position: relative;
    }
    :host::before {
      z-index: -1;
      content: "";
      position: absolute;
      top: -35px; 
      left: 35px;
      width: 90px;
      height: 90px;
      background: url("/resources/images/quote.png") no-repeat 0 0;
      background-size: 90px 90px;
      filter: opacity(6%);
    }
    p {
      font-style: italic;
    }
    .author {
      font-size: 20px;
      text-align: right;
      font-family: 'Yellowtail', cursive;
      margin-right: 20px;
    }
    @media all and (max-width: 599px) {
      :host {
        padding: 0 40px;
      }
      :host:before {
        left: 10px;
      }
    }
  `];
  constructor() {
    super();
    this._objectDbSync = new ObjectDbSyncController(
      this,
      {
        getObject: async (path) => await getFromDb(path) || {},
        updateField: async (objectPath, dataPath, {type, data}, oldData, object) => {
          return updateDataOrImageInObjectInDb(type, objectPath, dataPath, data, object);
        },
        onDataReadyChange: (ready) => this._ready = ready,
        onDataChange: (quote) => this._quote = quote,
      },
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`quotes/${this.uid}`);
      this._objectDbSync.setPath(this._path);
    }
  }
  render() {
    return html`
      <hg-editable-text
        .ready=${this._ready}
        .text=${this._quote?.text}
        @save=${({detail: text}) => {
          this._objectDbSync.requestFieldUpdate('text', {type: 'data', data: text});
        }}>
        <p></p>
      </hg-editable-text>
      <hg-editable-text
        .ready=${this._ready}
        .text=${this._quote?.author}
        @save=${({detail: text}) => {
          this._objectDbSync.requestFieldUpdate('author', {type: 'data', data: text});
        }}>
        <div class="author"></div>
      </hg-editable-text>
    `;
  }
}
customElements.define('hg-quote', HgQuote);
