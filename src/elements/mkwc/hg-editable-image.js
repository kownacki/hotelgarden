import {MkwcEditableImage} from 'mkwc/edit/mkwc-editable-image.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';

export class HgEditableImage extends MkwcEditableImage {
  firebaseAuth;
  constructor() {
    super();
    this.firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this.editingEnabled = loggedIn;
    });
  }
}
customElements.define('hg-editable-image', HgEditableImage);


