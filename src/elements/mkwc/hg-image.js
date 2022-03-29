import {MkwcImage} from 'mkwc/edit/mkwc-image.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {firebaseUtils as fb} from '../../utils/firebase.js';

export class HgImageWithoutEditing extends MkwcImage {
  async getData(path) {
    return fb.get(path);
  }
  async updateData(path, file, oldImage) {
    return fb.updateImage(path, file, oldImage?.name);
  }
}
customElements.define('hg-image-without-editing', HgImageWithoutEditing);

export class HgImage extends HgImageWithoutEditing {
  loggedIn;
  constructor() {
    super();
    this.loggedIn = new FirebaseAuthController(this, (loggedIn) => {
      this.editingEnabled = loggedIn;
    });
  }
}
customElements.define('hg-image', HgImage);
