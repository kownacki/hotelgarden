import {MkwcImage} from 'mkwc/edit/mkwc-image.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {firebaseUtils as fb} from '../../utils/firebase.js';

export class HgImage extends MkwcImage {
  loggedIn;
  constructor() {
    super();
    this.loggedIn = new FirebaseAuthController(this, (loggedIn) => {
      this.editingEnabled = loggedIn;
    });
  }
  async getData(path) {
    return await fb.get(path);
  }
  async updateData(path, file, oldImage) {
    return await fb.updateImage(path, file, oldImage?.name);
  }
}
customElements.define('hg-image', HgImage);
