import {LitElement, html, css} from 'lit-element';
import {db, updateImage, deleteImage} from '../utils.js';
import './hg-content-slider/hg-content-slider-item.js';
import '../elements/hg-image-upload-fab.js';
import '../elements/hg-content-label.js';
import firebase from "firebase";

customElements.define('hg-content-slider', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _images: Array,
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = firebase.auth().onAuthStateChanged((user) => this._loggedIn = Boolean(user));
    (async () => {
      await this.updateComplete;
      this._images = _.map.convert({cap: false})(
        (image, index) => ({index, ...image}),
        _.toArray((await db.doc('contentSliders/' + this.uid).get()).data()),
      );
    })();
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  static get styles() {
    return css`
      :host {
        position: relative;
        display: block;
        max-width: 1200px;
        margin: 100px auto;
        height: 350px;
        background: rgba(var(--placeholder-color-rgb), 0.5);
      }
      :host(:hover) hg-content-label {
        display: block;
      }
      hg-slider {
        height: 100%;
      }
      @media all and (max-width: 959px) {
        :host {
          margin: 70px auto;
        }
      }
      @media all and (max-width: 599px) {
        :host {
          margin: 40px auto;
        }
      }
    `;
  }
  async updateImage(image, file) {
    if (image.index === this._images.length) {
      this._images = [...this._images, image];
    }
    Object.assign(image, await updateImage('contentSliders/' + this.uid, String(image.index), file, image.name));
  }
  async deleteItem(index) {
    const image = this._images[index];
    deleteImage(image.name);
    const newImages = _.map.convert({cap: false})(
      (image, index) => _.set('index', index, image),
      _.remove((image) => image.index === index, this._images),
    );
    db.doc('contentSliders/' + this.uid).set({..._.map(_.omit('index'), newImages)});
    if (this.shadowRoot.getElementById('content-slider').selected === newImages.length) {
      --this.shadowRoot.getElementById('content-slider').selected;
    }
    this._images = newImages;
    this.requestUpdate();
  }
  render() {
    return html`
      ${_.isEmpty(this._images) ? '' : html`<hg-slider
        id="content-slider"
        ?double=${_.size(this._images) >= 2}
        .items=${this._images}
        .template=${(image) => html`
          <hg-content-slider-item
            .image=${image}
            .noDelete=${!this._loggedIn}
            @request-delete=${() => this.deleteItem(image.index)}
            @click-image=${() => !this.shadowRoot.getElementById('content-slider').transitionGoing && this.shadowRoot.getElementById('gallery-slider').open(image.index)}>
          </hg-content-slider-item>
        `}>
      </hg-slider>`}
      ${!this._loggedIn ? '' : html`<hg-image-upload-fab
        @upload=${async (event) => {
          const index = this._images.length;
          await this.updateImage({index}, event.detail);
          const contentSlider = this.shadowRoot.getElementById('content-slider');
          contentSlider.selected = (contentSlider.double && window.innerWidth >= 600) ? index - 1 : index;
          contentSlider.requestUpdate();
        }}>
      </hg-image-upload-fab>`}
      <hg-gallery-slider 
        id="gallery-slider" 
        .images=${this._images}
        @save=${async (event) => {
          await this.updateImage(event.detail.image, event.detail.file);
          this.requestUpdate();
          this.shadowRoot.getElementById('gallery-slider').requestUpdate();
        }}>
      </hg-gallery-slider>
      <hg-content-label .name=${'Slider'}></hg-content-label>
    `;
  }
});
