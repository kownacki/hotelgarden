import {LitElement, html, css} from 'lit';
import {createImage, deleteImage, staticProp} from "../../utils.js";
import '../../content/hg-article/hg-intro-article.js';
import '../../edit/hg-image-upload.js';
import '../../elements/hg-list/hg-mosaic-list.js'
import {firebaseUtils as fb} from '../../utils/firebase.js';
import './hg-gallery/hg-gallery-item.js';
import './hg-gallery/hg-gallery-slider.js';

export class HgGallery extends LitElement {
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
  }
  async updateImage(index, file) {
    const oldImageName = _.get(`${index}.image.name`, this._items);
    const list = this.shadowRoot.getElementById('list');
    list.items[index].image = await fb.updateImage(this._path.extend(`${index}.image`), file, oldImageName);
    list.items = {...list.items};
  }
  render() {
    return html`
      <hg-intro-article .uid=${'gallery'}></hg-intro-article>
      <hg-image-upload id="upload"></hg-image-upload>
      <hg-mosaic-list
        id="list"
        .path=${staticProp({doc: 'gallery/gallery'})}
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
        .onDelete=${(item) => {deleteImage(item.image.name)}}
        @items-changed=${(event) => this._items = event.detail}
        @ready-changed=${(event) => this._itemsReady = event.detail}>
      </hg-mosaic-list>
      <hg-gallery-slider
        id="slider" 
        .path=${this._path}
        .images=${_.reverse(_.map.convert({cap: false})((item, index) => ({...item.image, index}), this._items))}
        .ready=${this._itemsReady}
        @request-image-change=${async (event) => {
          await this.updateImage(event.detail.index, event.detail.file);
          this.shadowRoot.getElementById('list').requestUpdate();
        }}>
      </hg-gallery-slider>
    `;
  }
}
customElements.define('hg-gallery', HgGallery);
