import {db, updateData} from '../utils.js';
import HgEditableText from '../edit/hg-editable-text.js';

customElements.define('hg-text', class extends HgEditableText {
  static get properties() {
    return {
      // required params
      path: Object, // {doc: String, field: String}
      // optional params
      noGetText: Boolean,
    };
  }
  // duplicated from hg-list
  updated(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.path && !this.noGetText) {
        (async () => {
          this.text = _.get(this.path.field, (await db.doc(this.path.doc).get()).data());
          this.ready = true;
        })();
      }
    }
    super.updated(changedProperties);
  }
  constructor() {
    super();
    this.addEventListener('save', (event) => updateData(this.path.doc, this.path.field, event.detail));
  }
});
