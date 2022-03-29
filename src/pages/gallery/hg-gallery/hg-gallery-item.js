import {LitElement, html, css} from 'lit';
import '../../../elements/hg-element-with-enlarge/hg-image-with-enlarge.js';
import {VisibilityController} from '../../../utils/VisibilityController.js';

export class HgGalleryItem extends LitElement {
  visibility;
  static properties = {
    image: Object,
    ready: Boolean,
    _onceInProximity: Boolean,
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
  constructor() {
    super();
    this.visibility = new VisibilityController(this, undefined, (inProximity) => {
      if (inProximity && !this._onceInProximity) {
        this._onceInProximity = true;
      }
    });
  }
  render() {
    const ready = this.ready && this._onceInProximity;
    return html`
      <hg-image-with-enlarge
        .ready=${ready}
        .image=${this.image}>
      </hg-image-with-enlarge>
    `;
  }
}
customElements.define('hg-gallery-item', HgGalleryItem);
