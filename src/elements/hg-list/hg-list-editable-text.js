import HgEditableText from '../../edit/hg-editable-text.js';

customElements.define('hg-list-editable-text', class extends HgEditableText {
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
      this.ready = true;
    })();
    this.addEventListener('save', (event) => this.dispatchEvent(new CustomEvent('update', {detail: {path: this.field, data: event.detail}, bubbles: true, composed: true})));
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('item') || changedProperties.has('field')) {
      this.text = _.get(this.field, this.item);
    }
  }
});

