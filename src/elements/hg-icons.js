import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {
  createDbPath,
  DbPath,
  getFromDb,
  updateDataOrImageInObjectInDb,
  updateInDb,
} from '../utils/database.js';
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
    _isEditing: Boolean,
    _isUpdating: Boolean,
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
      {
        getItems: async (path) => await getFromDb(path) || {},
        updateItem: async (path, index, {type, dataPath, data}, oldItem, items) => {
          const updatedData = await updateDataOrImageInObjectInDb(type, path, `${index}.${dataPath}`, data, items);
          return _.set(dataPath, updatedData, oldItem);
        },
        updateAllItems: async (path, data) => {
          await updateInDb(path, data);
          return data;
        },
        onDataReadyChange: (iconsReady) => {
          this._iconsReady = iconsReady;
        },
        onDataChange: (icons) => {
          this._icons = icons;
        },
        onIsUpdatingChange: (isUpdating) => {
          this._isUpdating = isUpdating;
        },
      },
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`iconBlocks/${this.uid}`)
      this._iconsDbSync.setPath(this._path);
    }
  }
  render() {
    const showControls = this._loggedIn;
    const disableControls = this._isEditing || this._isUpdating;

    return html`
      <hg-list-old
        .__noAddUpdate=${true}
        .__noDeleteUpdate=${true}
        .__noSwapUpdate=${true}
        .__noItemChangeUpdate=${true}
        .items=${this._icons}
        .showControls=${showControls}
        .disableControls=${disableControls}
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
        @editing-item-changed=${({detail: isEditingItem}) => {
          this._isEditing = isEditingItem;
        }}
        @request-items-change=${({detail: {newItems}}) => {
          this._iconsDbSync.requestAllItemsUpdate(newItems);
        }}
        @request-item-update=${({detail: {index, type, dataPath, data}}) => {
          this._iconsDbSync.requestItemUpdate(index, {type, dataPath, data});
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
