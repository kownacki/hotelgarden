import {DbSyncController} from 'mkwc/DbSyncController.js';
import {firebaseUtils as fb} from '../../utils/firebase.js';
import {HgEditableImage} from './hg-editable-image.js';

export class HgEditableImageWithSync extends HgEditableImage {
  _dbSync;
  static properties = {
    path: Object,
  };
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._dbSync = new DbSyncController(
      this,
      (path) => fb.get(path),
      (path, file, oldImage) => fb.updateImage(path, file, oldImage?.name),
      (dataReady) => this.ready = dataReady,
      (image) => this.src = image?.url,
    );
    this.addEventListener('image-uploaded', ({detail: blob}) => {
      this._dbSync.requestDataUpdate(blob);
    });
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('path')) {
      this._dbSync.setPath(this.path);
    }
  }
}
customElements.define('hg-editable-image-with-sync', HgEditableImageWithSync);
