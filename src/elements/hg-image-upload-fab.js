import {LitElement, html, css} from 'lit';
import '@material/mwc-fab';
import '../edit/hg-image-upload.js';
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
        <hg-image-upload id="upload"></hg-image-upload>
        <mwc-fab
          .icon=${'add'}
          @click=${async() => {
            // todo when cancelling there is error
            this.dispatchEvent(new CustomEvent('upload', {detail: await this.shadowRoot.getElementById('upload').upload()}));
          }}>
        </mwc-fab>
      </div>
    `;
  }
}
customElements.define('hg-image-upload-fab', HgImageUploadFab);
