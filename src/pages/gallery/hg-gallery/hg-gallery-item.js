import {LitElement, html, css} from 'lit';
import '../../../elements/hg-element-with-enlarge/hg-image-with-enlarge.js';

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
      border: solid 1px transparent;
      box-sizing: border-box;
    }
    hg-image-with-enlarge {
      width: 100%;
      height: 100%;
    }
  `;
  render() {
    return html`
      <hg-image-with-enlarge
        .ready=${this.ready}
        .image=${this.image}>
      </hg-image-with-enlarge>
    `;
  }
}
customElements.define('hg-gallery-item', HgGalleryItem);
