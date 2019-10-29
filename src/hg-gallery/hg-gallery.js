import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import firebase from 'firebase/app';
import 'firebase/storage';

import '../edit/hg-delete-item.js';
import './hg-gallery-upload.js';
import './hg-gallery-carousel.js';

customElements.define('hg-gallery', class extends LitElement {
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
      .image:hover {
        cursor: pointer;
      }
      .image:not(:hover) hg-delete-item:not([dialog-opened]) {
        display: none;
      }
    `;
  }
  render() {
    return html`
      <hg-gallery-upload 
        .images=${this.images}
        @upload-started=${() => this.requestUpdate()}
        @upload-finished=${() => {this.requestUpdate(); this.shadowRoot.getElementById('carousel').requestUpdate()}}>
      </hg-gallery-upload>
      <div class="images">
        ${repeat(this.images, _.get('name'), (image, index) => html`
          <div class="image">
            <iron-image
              src="${image.url}" 
              sizing="cover"
              @click=${() => {
                this.shadowRoot.getElementById('carousel').open(index);
              }}>
            </iron-image>
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
      <hg-gallery-carousel id="carousel" .images=${this.images}></hg-gallery-carousel>
    `;
  }
});
