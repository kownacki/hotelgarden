import {LitElement, html, css} from 'lit-element';
import {createImage, deleteImage, updateImage, staticProp} from "../../utils.js";
import './hg-gallery/hg-gallery-item.js';
import './hg-gallery/hg-gallery-slider.js';
import '../../edit/hg-image-upload.js';
import '../../elements/hg-list/hg-mosaic-list.js'

customElements.define('hg-gallery', class extends LitElement {
  static get properties() {
    return {
      _items: Object,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 40px auto;
        max-width: 1300px;
        padding: 0 20px 1px;
      }
    `;
  }
  async updateImage(image, index, file) {
    const list = this.shadowRoot.getElementById('list');
    list.items[index].image = await updateImage('gallery/gallery', `${index}.image`, file, image.name);
    list.items = {...list.items};
  }
  render() {
    return html`
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
        .onAdd=${async (newItem) => ({
          ...newItem,
          image: await createImage(await this.shadowRoot.getElementById('upload').upload()),
        })}
        .onDelete=${(item) => {deleteImage(item.image.name)}}
        @items-changed=${(event) => this._items = event.detail}>
      </hg-mosaic-list>
      <hg-gallery-slider
        id="slider" 
        .images=${_.reverse(_.map.convert({cap: false})((item, index) => ({...item.image, index}), this._items))}
        @save=${async (event) => {
          await this.updateImage(event.detail.image, event.detail.image.index, event.detail.file);
          this.shadowRoot.getElementById('list').requestUpdate();
        }}>
      </hg-gallery-slider>
    `;
  }
});
