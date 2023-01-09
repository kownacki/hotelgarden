import {LitElement, html, css} from 'lit';
import {HDTV_WIDTH, IMAGE_COMPRESSION_QUALITY} from '../../../utils/config.js';
import '../../edit/hg-editable-text.js';
import ckContent from '../../styles/ck-content.js'
import sharedStyles from '../../styles/shared-styles.js';
import {createImageInDb} from '../../utils/database.js';

const maxContentImageWidth = HDTV_WIDTH;
const maxContentHeight = Infinity;

export class HgDynamicPathPageContent extends LitElement {
  static properties = {
    content: String,
  };
  static styles = [sharedStyles, ckContent, css`
  `];
  render() {
    return html`
      <hg-editable-text
        .multiline=${true}
        .ready=${true}
        .rich=${true}
        .text=${this.content}
        .uploadHandler=${async (file) => {
          const {fitAndCompress} = await import('mk-frontend-web-utils/fitAndCompress.js');
          const fittedAndCompressedFile = await fitAndCompress(
            'contain',
            maxContentImageWidth,
            maxContentHeight,
            IMAGE_COMPRESSION_QUALITY,
            file
          );
          const image = await createImageInDb(fittedAndCompressedFile);
          this.dispatchEvent(new CustomEvent('image-uploaded', {detail: {image}}));
          return image.url;
        }}
        @save=${({detail: text}) => {
          this.dispatchEvent(new CustomEvent('content-changed', {detail: text}));
        }}>
        <div class="ck-content smaller-text"></div>
      </hg-editable-text>
    `;
  }
}
customElements.define('hg-dynamic-path-page-content', HgDynamicPathPageContent);
