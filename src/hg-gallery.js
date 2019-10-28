import {LitElement, html, css} from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import {repeat} from 'https://unpkg.com/lit-html@^1.0.0/directives/repeat.js?module';
import 'https://unpkg.com/@polymer/iron-image@^3.0.2/iron-image.js?module';
import './edit/hg-delete-item.js';

class HgGallery extends LitElement {
  static get properties() {
    return {
      images: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      this.images = await Promise.all(_.map(async (item) => ({
        name: item.name,
        url: await item.getDownloadURL(),
      }), _.reverse((await firebase.storage().ref('gallery').listAll()).items)));
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: auto;
        max-width: 1300px;
      }
      .images {
        display: flex;
        flex-wrap: wrap;
      }
      .image {
        width: calc(50% - 2px);
        margin: 1px;
        position: relative;
      }
      iron-image {
        display: block;
        padding-bottom: 60%;
      }
      hg-delete-item {
        background: white;
        position: absolute;
        right: 0;
        top: 0;
      }
      .image:not(:hover) hg-delete-item:not([dialog-opened]) {
        display: none;
      }
    `;
  }
  render() {
    return html`
      <input type="file"
        accept="image/png, image/jpeg"
        @change=${async (event) => {
          const file = event.target.files[0];
          event.target.value = '';
          const image = {name: Date.now()};
          // First unshift to 'images' and then asynchronously set url to prevent from 
          // race condition when another image is added immediately
          this.images.unshift(image);
          this.requestUpdate();
          const ref = firebase.storage().ref('gallery/' + image.name);
          await ref.put(file);
          image.url = await ref.getDownloadURL();
          this.requestUpdate();
        }}>
        <div class="images">
          ${repeat(this.images, _.get('name'), (image, index) => html`
            <div class="image">
              <iron-image src="${image.url}" sizing="cover"></iron-image>
              <hg-delete-item
                .name=${image.name}
                @request-delete=${() => {
                  firebase.storage().ref('gallery/' + image.name).delete();
                  this.images.splice(index, 1);
                  this.requestUpdate();
                }}>
              </hg-delete-item>
            </div>
          `)}
        </div>
    `;
  }
}
customElements.define('hg-gallery', HgGallery);
