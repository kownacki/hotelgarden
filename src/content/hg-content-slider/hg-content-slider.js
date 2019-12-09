import {LitElement, html, css} from 'lit-element';
import {db, updateImage} from '../../utils.js';
import './hg-content-slider-item.js';

customElements.define('hg-content-slider', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _images: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._images = _.map.convert({cap: false})(
        (image, index) => ({index, ...image}),
        (await db.doc('contentSliders/' + this.uid).get()).data()
      );
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        margin: 60px auto;
      }
      hg-slider {
        height: 350px;
      }
    `;
  }
  async updateImage(image, file) {
    Object.assign(image, await updateImage('contentSliders/' + this.uid, image.index, file, image.name));
    this.requestUpdate();
  }
  render() {
    return html`
      <hg-slider
        id="content-slider"
        double
        .items=${this._images}
        .template=${(image) => html`
          <hg-content-slider-item
            .url=${image.url}
            @click=${() => !this.shadowRoot.getElementById('content-slider').transitionGoing && this.shadowRoot.getElementById('gallery-slider').open(image.index)}>
          </hg-content-slider-item>
        `}>
      </hg-slider>
      <hg-gallery-slider 
        id="gallery-slider" 
        .images=${this._images}
        @save=${(event) => this.updateImage(event.detail.image, event.detail.file)}>
      </hg-gallery-slider>
    `;
  }
});
