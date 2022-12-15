import {LitElement, html, css} from 'lit';
import {IMAGE_COMPRESSION_QUALITY} from '../../../utils/config.js';
import sharedStyles from '../../styles/shared-styles.js';
import {HG_WINDOW_SLIDER_IMAGE_MAX_HEIGHT, HG_WINDOW_SLIDER_IMAGE_MAX_WIDTH} from '../hg-window-slider.js';
import '../mkwc/hg-editable-image.js';

export class HgWindowSliderItem extends LitElement {
  static properties = {
    image: Object,
    ready: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-editable-image {
      --mkwc-image-placeholder-color: transparent;
      height: 100%;
    }
  `];
  render() {
    return html`
      <hg-editable-image
        .src=${this.image?.url}
        .ready=${this.ready}
        .fit=${'contain'}
        .maxWidth=${HG_WINDOW_SLIDER_IMAGE_MAX_WIDTH}
        .maxHeight=${HG_WINDOW_SLIDER_IMAGE_MAX_HEIGHT}
        .compressionQuality=${IMAGE_COMPRESSION_QUALITY}
        @image-uploaded=${({detail: file}) => {
          this.dispatchEvent(new CustomEvent('request-image-change', {detail: {index: this.image.index, file}}));
        }}>
      </hg-editable-image>
    `;
  }
}
customElements.define('hg-window-slider-item', HgWindowSliderItem);
