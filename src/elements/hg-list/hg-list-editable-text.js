import hgEditableText from '../../edit/hg-editable-text.js';

customElements.define('hg-list-editable-text', class extends hgEditableText {
  static get properties() {
    return {
      item: Object,
      field: String,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this.text = _.get(this.field, this.item);
    })();
    this.addEventListener('save', (event) => this.dispatchEvent(new CustomEvent('update', {detail: {path: this.field, data: event.detail}, bubbles: true, composed: true})));
  }
});

