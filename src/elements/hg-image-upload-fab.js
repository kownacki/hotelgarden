import {LitElement, html, css} from 'lit';
import '@material/mwc-fab';
import 'mkwc/edit/mkwc-image-upload.js';
import sharedStyles from '../styles/shared-styles.js';

export class HgImageUploadFab extends LitElement {
  static styles = [sharedStyles, css`
    mwc-fab {
      position: absolute;
      bottom: 20px;
      right: 20px;
      margin: 2px;
    }
  `];
  render() {
    return html`
      <div class="cms">
        <mkwc-image-upload id="upload"></mkwc-image-upload>
        <mwc-fab
          .icon=${'add'}
          @click=${async() => {
            let file = await this.shadowRoot.getElementById('upload').upload();
            if (file) {
              this.dispatchEvent(new CustomEvent('upload', {detail: file}));
            }
          }}>
        </mwc-fab>
      </div>
    `;
  }
}
customElements.define('hg-image-upload-fab', HgImageUploadFab);
