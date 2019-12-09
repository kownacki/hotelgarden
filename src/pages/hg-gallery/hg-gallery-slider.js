import {LitElement, html, css} from 'lit-element';
import '../../hg-slider.js';
import '../../edit/hg-delete-item.js';
import '../../edit/hg-editable-image.js';
import '../../hg-image-upload.js';

//todo bug clicking go back when image is displayed breaks website
customElements.define('hg-gallery-slider', class extends LitElement {
  static get properties() {
    return {
      images: Array,
      selected: Number,
    };
  }
  static get styles() {
    return css`      
      :host {
        display: none;
        background: white;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        z-index: 1;
      }
      hg-slider {
        height: 100%;
      }
      .controls {
        position: fixed;
        top: 0;
        right: 0;
        background: white;
      }
    `;
  }
  constructor() {
    super();
    this.selected = 0;
  }
  open(index) {
    this.selected = index;
    this.style.display = 'block';
    // Imperatively change 'selected' in case #slider changed it himself.
    this.shadowRoot.getElementById('slider').selected = this.selected;
    this.shadowRoot.getElementById('slider').requestUpdate();
    document.body.style.overflow = 'hidden';
    this.dispatchEvent(new CustomEvent('hide-header', {composed: true}))
  }
  close() {
    this.style.display = 'none';
    document.body.style.overflow = 'auto';
    this.dispatchEvent(new CustomEvent('show-header', {composed: true}));
  };
  render() {
    return html`
      <hg-slider
        id="slider"
        .selected=${this.selected}
        @selected-changed=${(event) => this.selected = event.detail}
        .items=${this.images}
        .template=${(image) => html`
          <hg-editable-image
            .src=${image.url}
            .sizing=${'contain'}
            @save=${(event) => this.dispatchEvent(new CustomEvent('save', {detail: {image, file: event.detail}}))}>
          </hg-editable-image>
        `}>
      </hg-slider>
      <div class="controls">
        <hg-image-upload
          @upload=${(event) => {
            this.selected = this.images.length;
            this.dispatchEvent(new CustomEvent('save', {detail: {
              image: {index: this.images.length},
              file: event.detail,
            }}));
          }}>
        </hg-image-upload>
        <hg-delete-item .name=${_.get(this.selected + '/name', this.images)}>
        </hg-delete-item>
        <paper-icon-button
          icon="close"
          @click=${this.close}>
        </paper-icon-button>
      </div>
    `;
  }
});
