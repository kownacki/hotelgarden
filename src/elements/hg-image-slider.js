import {LitElement, html, css} from 'lit-element';
import {db, updateData, updateImage, deleteImage, getData} from '../utils.js';
import './hg-image-slider/hg-image-slider-item.js';
import './hg-image-upload-fab.js';
import firebase from "firebase";

//todo esc should close window
customElements.define('hg-image-slider', class extends LitElement {
  static get properties() {
    return {
      // required params
      path: String,
      // optional params
      noGetImages: Boolean,
      images: Object,
      double: Boolean,
      // private
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = firebase.auth().onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  updated(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.path && !this.noGetImages) {
        (async () => {
          this.images = await getData(this.path.doc, this.path.field);
        })();
      }
    }
  }
  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
        background: rgba(var(--placeholder-color-rgb), 0.5);
      }
      hg-slider {
        background: transparent;
        height: 100%;
      }
    `;
  }
  async updateImage(index, file) {
    const oldImageName = _.get(`${index}.name`, this.images);
    const newImage = await updateImage(this.path.doc, _.join('.', _.compact([this.path.field, String(index)])), file, oldImageName);
    if (index === _.size(this.images)) {
      this.images = _.set(index, newImage, this.images);
    } else {
      this.images[index] = newImage;
    }
  }
  async deleteItem(index) {
    const image = this.images[index];
    deleteImage(image.name);

    let newImages;
    newImages = _.toArray(this.images);
    newImages.splice(index, 1);
    newImages = {...newImages};

    updateData(this.path.doc, this.path.field, newImages);
    if (this.shadowRoot.getElementById('content-slider').selected === _.size(newImages)) {
      --this.shadowRoot.getElementById('content-slider').selected;
    }
    this.images = newImages;
    this.requestUpdate();
  }
  render() {
    return html`
      ${_.isEmpty(this.images) ? '' : html`<hg-slider
        id="content-slider"
        ?double=${this.double && _.size(this.images) >= 2}
        .items=${_.map.convert({cap: false})((image, index) => ({index: Number(index), ...image}), this.images)}
        .template=${(image) => html`
          <hg-image-slider-item
            .image=${image}
            .noDelete=${!this._loggedIn}
            @request-delete=${() => this.deleteItem(image.index)}
            @click-image=${() => !this.shadowRoot.getElementById('content-slider').transitionGoing && this.shadowRoot.getElementById('gallery-slider').open(image.index)}>
          </hg-image-slider-item>
        `}>
      </hg-slider>`}
      ${!this._loggedIn ? '' : html`<hg-image-upload-fab
        @upload=${async (event) => {
          const index = _.size(this.images);
          await this.updateImage(index, event.detail);
          const contentSlider = this.shadowRoot.getElementById('content-slider');
          contentSlider.selected = (contentSlider.double && window.innerWidth >= 600) ? index - 1 : index;
          contentSlider.requestUpdate();
        }}>
      </hg-image-upload-fab>`}
      <hg-gallery-slider 
        id="gallery-slider" 
        .images=${_.map.convert({cap: false})((image, index) => ({index: Number(index), ...image}), this.images)}
        @save=${async (event) => {
          await this.updateImage(event.detail.index, event.detail.file);
          this.requestUpdate();
          this.shadowRoot.getElementById('gallery-slider').requestUpdate();
        }}>
      </hg-gallery-slider>
    `;
  }
});
