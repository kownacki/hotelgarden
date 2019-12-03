import {LitElement, html, css} from 'lit-element';
import {repeat} from "lit-html/directives/repeat";
import {storage} from "../utils.js";

customElements.define('hg-content-slider', class extends LitElement {
  static get properties() {
    return {
      _images: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      this._images = await Promise.all(_.map.convert({cap: false})(async (item, index) => ({
        name: item.name,
        url: await item.getDownloadURL(),
        index,
      }), _.reverse((await storage.ref('gallery').listAll()).items)));
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        margin: 20px auto;
      }
      hg-slider {
        height: 350px;
      }
    `;
  }
  render() {
    return html`
      <hg-slider
        id="content-slider"
        double
        .items=${this._images}
        .template=${(image, index) => html`
          <iron-image
            .src=${image.url}
            .sizing=${'cover'}
            @click=${() => !this.shadowRoot.getElementById('content-slider').transitionGoing && this.shadowRoot.getElementById('gallery-slider').open(image.index)}>
          </iron-image>
        `}>
      </hg-slider>
      <hg-gallery-slider id="gallery-slider" .images=${this._images}></hg-gallery-slider>
    `;
  }
});
