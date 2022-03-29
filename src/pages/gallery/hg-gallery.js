import {LitElement, html, css} from 'lit';
import {createImage, staticProp} from "../../utils.js";
import '../../content/hg-article/hg-intro-article.js';
import '../../edit/hg-image-upload.js';
import '../../elements/hg-list/hg-mosaic-list.js'
import {firebaseUtils as fb} from '../../utils/firebase.js';
import {ItemsDbSyncController} from '../../utils/ItemsDbSyncController.js';
import './hg-gallery/hg-gallery-item.js';
import './hg-gallery/hg-gallery-slider.js';

export class HgGallery extends LitElement {
  _itemsDbSync;
  static properties = {
    _path: fb.Path,
    _items: Object,
    _itemsReady: Boolean,
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
    this._path = fb.path('gallery/gallery');
    this._itemsDbSync = new ItemsDbSyncController(
      this,
      async (path) => await fb.get(path) || {},
      async (path, index, file, oldItem, items) => {
        const updatedImage = await fb.updateImageInObject(path, `${index}.image`, file, items);
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
      <hg-image-upload id="upload"></hg-image-upload>
      <hg-mosaic-list
        id="list"
        .path=${staticProp({doc: 'gallery/gallery'})}
        .noGetItems=${true}
        .items=${this._items}
        .itemTemplate=${(item, index) => html`
          <hg-gallery-item
            .src=${item.image.url}
            @click=${() => {
              this.shadowRoot.getElementById('slider').open(_.size(this._items) - Number(index) - 1);
            }}>
            </hg-gallery-item>
        `}
        .getItemName=${(item) => `obraz "${item.uid}"`}
        .onAdd=${async (newItem) => {
          const uploadResult = await this.shadowRoot.getElementById('upload').upload();
          return uploadResult
            ? {...newItem, image: await createImage(uploadResult)}
            : false;
        }}
        .onDelete=${(item) => {
          fb.deleteImage(item.image.name);
        }}
        @items-changed=${(event) => {
          this._items = event.detail;
        }}>
      </hg-mosaic-list>
      <hg-gallery-slider
        id="slider"
        .images=${_.reverse(_.map.convert({cap: false})((item, index) => ({...item.image, index}), this._items))}
        .ready=${this._itemsReady}
        @request-image-change=${(event) => {
          this._itemsDbSync.requestItemUpdate(event.detail.index, event.detail.file);
        }}>
      </hg-gallery-slider>
    `;
  }
}
customElements.define('hg-gallery', HgGallery);
