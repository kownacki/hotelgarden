import {MkwcImage} from 'mkwc/edit/mkwc-image.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {firebaseUtils as fb} from '../../utils/firebase.js';

export class HgImage extends MkwcImage {
  loggedIn = new FirebaseAuthController(this, (loggedIn) => {
    this.editingEnabled = loggedIn;
  });
  getData(path) {
    return fb.get(path);
  }
  updateData(path, file, oldImage) {
    return fb.updateImage(path, file, (_.get('name', oldImage)));
  }
}
customElements.define('hg-image', HgImage);
