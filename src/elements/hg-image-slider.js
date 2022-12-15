import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {DbPath, deleteImageInDb, getFromDb, updateInDb, updateImageInDb} from '../utils/database.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import './hg-image-slider/hg-image-slider-item.js';
import './hg-slider.js';
import './hg-window-slider.js';

//todo esc should close window
export class HgImageSlider extends LitElement {
  _firebaseAuth;
  static properties = {
    // required params
    path: DbPath,
    // optional params
    noGetImages: Boolean,
    images: Object,
    ready: Boolean,
    double: Boolean,
    // private
    _loggedIn: Boolean,
  };
  static styles = css`
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
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
  }
  updated(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.path && !this.noGetImages) {
        (async () => {
          this.ready = false;
          this.images = await getFromDb(this.path);
          this.ready = true;
        })();
      }
    }
  }
  async updateImage(index, file) {
    const oldImageName = _.get(`${index}.name`, this.images);
    const newImage = await updateImageInDb(this.path.extend(String(index)), file, oldImageName);
    if (index === _.size(this.images)) {
      this.images = _.set(index, newImage, this.images);
    } else {
      this.images[index] = newImage;
    }
  }
  async deleteItem(index) {
    const image = this.images[index];
    deleteImageInDb(image.name);

    let newImages;
    newImages = _.toArray(this.images);
    newImages.splice(index, 1);
    newImages = {...newImages};

    updateInDb(this.path, newImages);
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
            .ready=${this.ready}
            .image=${image}
            .noDelete=${!this._loggedIn}
            @request-delete=${() => this.deleteItem(image.index)}
            @click-image=${() => !this.shadowRoot.getElementById('content-slider').transitionGoing && this.shadowRoot.getElementById('window-slider').open(image.index)}>
          </hg-image-slider-item>
        `}>
      </hg-slider>`}
      ${!this._loggedIn ? '' : until(import('./hg-image-upload-fab.js').then(() => {
        return html`
          <hg-image-upload-fab
            @upload=${async ({detail: file}) => {
              const index = _.size(this.images);
              await this.updateImage(index, file);
              const contentSlider = this.shadowRoot.getElementById('content-slider');
              contentSlider.selected = (contentSlider.double && window.innerWidth >= 600) ? index - 1 : index;
              contentSlider.requestUpdate();
            }}>
          </hg-image-upload-fab>
        `;
      }))}
      <hg-window-slider
        id="window-slider"
        .ready=${this.ready}
        .images=${_.map.convert({cap: false})((image, index) => ({index: Number(index), ...image}), this.images)}
        @request-image-change=${async ({detail: {index, file}}) => {
          await this.updateImage(index, file);
          this.requestUpdate();
          this.shadowRoot.getElementById('window-slider').requestUpdate();
        }}>
      </hg-window-slider>
    `;
  }
}
customElements.define('hg-image-slider', HgImageSlider);
