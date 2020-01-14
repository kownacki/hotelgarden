import {db} from '../utils.js';
import HgEditableText from '../edit/hg-editable-text.js';

customElements.define('hg-text', class extends HgEditableText {
  static get properties() {
    return {
      uid: String,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this.text = _.get('text', (await db.doc('texts/' + this.uid).get()).data());
    })();
    this.addEventListener('save', (event) => db.doc('texts/' + this.uid).set({text: event.detail}));
  }
});
