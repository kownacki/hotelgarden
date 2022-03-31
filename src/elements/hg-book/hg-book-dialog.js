import {LitElement, html, css, unsafeCSS} from 'lit';
import {firebaseUtils as fb} from '../../utils/firebase.js';
import {ObjectDbSyncController} from '../../utils/ObjectDbSyncController.js';
import {staticProp, openProfitroom} from '../../utils.js';
import sharedStyles from '../../styles/shared-styles.js';
import ckContent from '../../styles/ck-content.js'
import '../mkwc/hg-image.js'
import '../hg-action-button.js';
import '../hg-dialog.js';
import '../hg-text.js'

const maxImageWidth = 600;
const maxImageHeight = 180;

export class HgBookDialog extends LitElement {
  static properties = {
    dialog: Element,
    _data: Object,
    _dataReady: Boolean,
  };
  static styles = [sharedStyles, ckContent, css`
    :host {
      ${unsafeCSS(`
        --max-image-width: ${maxImageWidth}px;
        --max-image-height: ${maxImageHeight}px;
      `)}
    }
    hg-dialog {
      --hg-dialog-width: 800px;
    }
    .container {
      display: flex;
      justify-content: space-between;
    }
    .container > * {
      width: calc(50% - 10px);
    }
    h3 {
      margin: 10px 0
    }
    hg-image {
      width: 100%;
      height: var(--max-image-height);
      margin-bottom: 20px;
    }
    hg-action-button {
      margin: 20px 0;
    }
    @media all and (max-width: 599px) {
      .container {
        flex-direction: column;
      }
      .container > * {
        width: auto;
      }
    }
  `];
  constructor() {
    super();
    this._path = fb.path('texts/book');
    this._objectDbSync = new ObjectDbSyncController(
      this,
      async (path) => await fb.get(path) || {},
      async (objectPath, dataPath, {type, data}, oldData, object) => {
        return fb.updateDataOrImageInObject(type, objectPath, dataPath, data, object);
      },
      (ready) => this._dataReady = ready,
      (data) => {
        this._data = data;
        this.dialog.notifyResize();
      }
    );
    this._objectDbSync.setPath(this._path);
  }
  render() {
    return html`
      <hg-dialog id="dialog" .noButtons=${true} @dialog-changed=${() => this.dialog = this.shadowRoot.getElementById('dialog').dialog}>
        <hg-text
          slot="header"
          .path=${staticProp({doc: 'texts/book', field: 'heading'})}
          .noGetText=${true}
          .text=${_.get('heading', this._data)}
          .ready=${this._dataReady}>
          <div class="bigger-text"></div>
        </hg-text>
        <div class="container" slot="content">
          ${_.map((location) => html`
            <div>
              <hg-text
                .path=${staticProp({doc: 'texts/book', field: `${location.name}.heading`})}
                .noGetText=${true}
                .text=${_.get(`${location.name}.heading`, this._data)}
                .ready=${this._dataReady}>
                <h3></h3>
              </hg-text>
              <hg-image
                .noGet=${true}
                .noUpdate=${true}
                .image=${this._data?.[location.name]?.image}
                .ready=${this._dataReady}
                .fit=${'cover'}
                .maxWidth=${maxImageWidth}
                .maxHeight=${maxImageHeight}
                @image-uploaded=${({detail: blob}) => {
                  this._objectDbSync.requestFieldUpdate(`${location.name}.image`, {type: 'image', data: blob});
                }}>
              </hg-image>
              <hg-text
                .path=${staticProp({doc: 'texts/book', field: `${location.name}.text`})}
                .rich=${true}
                .noGetText=${true}
                .text=${_.get(`${location.name}.text`, this._data)}
                .ready=${this._dataReady}>
                <div class="ck-content smaller-text"></div>
              </hg-text>
              <hg-action-button @click=${() => openProfitroom(location.name)}>Wybierz</hg-action-button>
            </div>
          `, [{name: 'villagarden'}, {name: 'hotelgarden'}])}     
        </div>
      </hg-dialog>
    `;
  }
}
customElements.define('hg-book-dialog', HgBookDialog);
