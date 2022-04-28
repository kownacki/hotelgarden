import {DbPath, getFromDb, updateInDb} from '../utils/database.js';
import HgEditableText from '../edit/hg-editable-text.js';

export class HgText extends HgEditableText {
  static properties = {
    // required params
    path: DbPath,
    // optional params
    noGetText: Boolean,
  };
  constructor() {
    super();
    this.addEventListener('save', (event) => updateInDb(this.path, event.detail));
  }
  // duplicated from hg-list-old
  updated(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.path && !this.noGetText) {
        (async () => {
          this.text = await getFromDb(this.path);
          this.ready = true;
          this.dispatchEvent(new CustomEvent('text-ready', {detail: this.text}));
        })();
      }
    }
    super.updated(changedProperties);
  }
}
customElements.define('hg-text', HgText);
