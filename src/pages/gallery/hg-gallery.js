import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../elements/hg-list/hg-mosaic-list.js'
import '../../elements/hg-window-slider.js';
import {createDbPath, createImageInDb, deleteImageInDb, DbPath, getFromDb, updateImageInObjectInDb} from '../../utils/database.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {ItemsDbSyncController} from '../../utils/ItemsDbSyncController.js';
import './hg-gallery/hg-gallery-item.js';

export class HgGallery extends LitElement {
  _itemsDbSync;
  static properties = {
    _path: DbPath,
    _items: Object,
    _itemsReady: Boolean,
    _loggedIn: Boolean,
  };
  static styles = css`
    :host {
      display: block;
      margin: 40px auto;
      width: 100%;
      max-width: 1300px;
      padding: 0 0 1px;
    }
    hg-intro-article {
      display: none;
    }
  `;
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
    this._path = createDbPath('gallery/gallery');
    this._itemsDbSync = new ItemsDbSyncController(
      this,
      async (path) => await getFromDb(path) || {},
      async (path, index, file, oldItem, items) => {
        const updatedImage = await updateImageInObjectInDb(path, `${index}.image`, file, items);
        return {
          ...oldItem,
          image: updatedImage,
        };
      },
      (itemsReady) => this._itemsReady = itemsReady,
      (items) => this._items = items,
    );
    this._itemsDbSync.setPath(this._path);
  }
  render() {
    return html`
      <hg-intro-article .uid=${'gallery'}></hg-intro-article>
      ${!this._loggedIn ? '' : until(import('mkwc/edit/mkwc-image-upload.js').then(() => {
        return html`
          <mkwc-image-upload id="upload"></mkwc-image-upload>
        `;
      }))}
      <hg-mosaic-list
        id="list"
        .path=${this._path}
        .noGetItems=${true}
        .items=${this._items}
        .itemTemplate=${(item, index) => html`
          <hg-gallery-item
            .ready=${this._itemsReady}
            .image=${item.image}
            @click=${() => {
              this.shadowRoot.getElementById('window-slider').open(_.size(this._items) - Number(index) - 1);
            }}>
          </hg-gallery-item>
        `}
        .getItemName=${(item) => `obraz "${item.uid}"`}
        .onAdd=${async (newItem) => {
          const uploadResult = await this.shadowRoot.getElementById('upload').upload();
          return uploadResult
            ? {...newItem, image: await createImageInDb(uploadResult)}
            : false;
        }}
        .onDelete=${(item) => {
          deleteImageInDb(item.image.name);
        }}
        @items-changed=${(event) => {
          this._items = event.detail;
        }}>
      </hg-mosaic-list>
      <hg-window-slider
        id="window-slider"
        .ready=${this._itemsReady}
        .images=${_.reverse(_.map.convert({cap: false})((item, index) => ({...item.image, index}), this._items))}
        @request-image-change=${(event) => {
          this._itemsDbSync.requestItemUpdate(event.detail.index, event.detail.file);
        }}>
      </hg-window-slider>
    `;
  }
}
customElements.define('hg-gallery', HgGallery);
