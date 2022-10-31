import {DbSyncController} from 'mkwc/DbSyncController.js';
import {DbPath, getFromDb, updateImageInDb} from '../../utils/database.js';
import {HgEditableImage} from './hg-editable-image.js';

export class HgEditableImageWithSync extends HgEditableImage {
  _dbSync;
  static properties = {
    path: DbPath,
  };
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._dbSync = new DbSyncController(
      this,
      {
        getData: (path) => getFromDb(path),
        updateData: (path, file, oldImage) => updateImageInDb(path, file, oldImage?.name),
        onDataReadyChange: (dataReady) => this.ready = dataReady,
        onDataChange: (image) => this.src = image?.url,
      },
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
