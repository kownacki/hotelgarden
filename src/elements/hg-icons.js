import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {createDbPath, DbPath, getFromDb, updateInDb, updateInObjectInDb} from '../utils/database.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import {ItemsDbSyncController} from '../utils/ItemsDbSyncController.js';
import {sleep} from '../utils.js';
import './hg-list-old.js';
import './hg-icons/hg-icons-item.js';

export class HgIcons extends LitElement {
  _iconsDbSync;
  _firebaseAuth;
  _addDialog;
  static properties = {
    uid: String,
    empty: {type: Boolean, reflect: true},
    small: {type: Boolean, reflect: true},
    _loggedIn: Boolean,
    _path: DbPath,
    _icons: Object,
    _iconsReady: Boolean,
  };
  static styles = css`
    :host {
      display: block;
    }
    hg-list-old {
      display: flex;
      flex-wrap: wrap;
    }
    :host(:not([small])) hg-list-old {
      min-height: 131px;
      justify-content: center;
    }
    :host([small]) hg-list-old {
      min-height: 60px;
      margin: 0 -15px;
    }
    :host([empty]) {
      background: rgba(var(--placeholder-color-rgb), 0.5);
    }
    @media all and (max-width: 959px) {
      :host([small]) hg-list-old {
        --columns: 3;
      }
    }
    @media all and (max-width: 769px) {
      :host([small]) hg-list-old {
        --columns: 2;
      }
    }
    @media all and (max-width: 479px) {
      :host([small]) hg-list-old {
        --columns: 1;
      }
    }
  `;
  constructor() {
    super();

    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });

    this._iconsDbSync = new ItemsDbSyncController(
      this,
      async (path) => await getFromDb(path) || {},
      async (objectPath, dataPath, data) => {
        await updateInObjectInDb(objectPath, dataPath, data);
        return data;
      },
      async (path, data) => {
        await updateInDb(path, data);
        return data;
      },
      (iconsReady) => this._iconsReady = iconsReady,
      (icons) => this._icons = icons,
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`iconBlocks/${this.uid}`)
      this._iconsDbSync.setPath(this._path);
    }
  }
  render() {
    return html`
      <hg-list-old
        .items=${this._icons}
        .path=${this._path}
        .enableEditing=${this._loggedIn}
        .getItemName=${() => 'ikonę'}
        .itemTemplate=${(icon, index, disableEdit) => html`
          <hg-icons-item .small=${this.small} .icon=${icon} .disableEdit=${disableEdit}></hg-icons-item>
        `}
        .onAdd=${async (newItem) => {
          if (!this._addDialog) {
            await import('./hg-icons/hg-icons-add.js');
            await sleep();
            this._addDialog = this.shadowRoot.getElementById('add');
          }
          const addResult = await this._addDialog.getIcon();
          return addResult 
            ? {...newItem, ...addResult}
            : false;
        }}
        @items-changed=${(event) => this.empty = _.isEmpty(event.detail)}>
      </hg-list-old>
      ${!this._loggedIn ? '' : until(import('./hg-icons/hg-icons-add.js').then(() => {
        return html`<hg-icons-add id="add"></hg-icons-add>`;
      }))}
    `;
  }
}
customElements.define('hg-icons', HgIcons);
