import {LitElement, html, css} from 'lit';
import '../hg-element-with-enlarge.js';
import '../mkwc/hg-image.js';

export class HgImageWithEnlarge extends LitElement {
  static properties = {
    image: Object,
    ready: Boolean,
  };
  static styles = css`
    :host {
      display: block;
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
customElements.define('hg-image-with-enlarge', HgImageWithEnlarge);
