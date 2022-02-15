import {LitElement, html, css} from 'lit';
import '../../pages/gallery/hg-gallery/hg-gallery-item.js'
import '../../edit/hg-delete-item.js'

export class HgImageSliderItem extends LitElement {
  static get properties() {
    return {
      image: Object,
      noDelete: Boolean,
      _deleteOpened: {type: Boolean, reflect: true, attribute: 'delete-opened'},
    };
  }
  static get styles() {
    return css`
      :host {
        position: relative;
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
  }
  render() {
    return html`
      <hg-gallery-item 
        .src=${_.get('url', this.image)}
        @click=${() => this.dispatchEvent(new CustomEvent('click-image'))}>
      </hg-gallery-item>
      ${this.noDelete ? '' : html`<hg-delete-item 
        .name=${_.get('name', this.image)}
        @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
      </hg-delete-item>`}
    `;
  }
}
customElements.define('hg-image-slider-item', HgImageSliderItem);
