import {LitElement, html, css} from 'lit';
import '../../edit/hg-delete-item.js'
import '../hg-element-with-enlarge/hg-image-with-enlarge.js'

export class HgImageSliderItem extends LitElement {
  static properties = {
    image: Object,
    ready: Boolean,
    noDelete: Boolean,
    _deleteOpened: {type: Boolean, reflect: true, attribute: 'delete-opened'},
  };
  static styles = css`
    :host {
      position: relative;
    }
    hg-image-with-enlarge {
      width: 100%;
      height: 100%;
      /* todo not really transparent due to grey background? */
      border: solid 1px transparent;
      box-sizing: border-box;
    }
    hg-delete-item {
      display: none;
      position: absolute;
      top: 15px;
      right: 15px;
    }
    :host(:hover) hg-delete-item, :host([delete-opened]) hg-delete-item {
      display: block;
    }
  `;
  render() {
    return html`
      <hg-image-with-enlarge
        .src=${this.image?.url}
        .ready=${this.ready}
        @click=${() => this.dispatchEvent(new CustomEvent('click-image'))}>
      </hg-image-with-enlarge>
      ${this.noDelete ? '' : html`<hg-delete-item 
        .name=${_.get('name', this.image)}
        @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
      </hg-delete-item>`}
    `;
  }
}
customElements.define('hg-image-slider-item', HgImageSliderItem);
