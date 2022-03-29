import {LitElement, html, css} from 'lit';
import '../../../elements/hg-element-with-enlarge.js';
import '../../../elements/mkwc/hg-image.js';

export class HgGalleryItem extends LitElement {
  static properties = {
    image: Object,
    ready: Boolean,
  };
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      /* todo not really transparent due to grey background? */
      border: solid 1px transparent;
      box-sizing: border-box;
    }
    hg-element-with-enlarge {
      width: 100%;
      height: 100%;
    }
  `;
  render() {
    return html`
      <hg-element-with-enlarge>
         <hg-image-without-editing
          .ready=${this.ready}
          .image=${this.image}
          .fit=${'cover'}>
        </hg-image-without-editing>
      </hg-element-with-enlarge>
    `;
  }
}
customElements.define('hg-gallery-item', HgGalleryItem);
