import HgEditableText from '../../edit/hg-editable-text.js';

export class HgListEditableText extends HgEditableText {
  static properties = {
    item: Object,
    field: String,
  };
  constructor() {
    super();
    this.addEventListener('save', (event) => this.dispatchEvent(new CustomEvent('update', {detail: {path: this.field, data: event.detail}, bubbles: true, composed: true})));
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.text = _.get(this.field, this.item);
    this.ready = true;
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('item') || changedProperties.has('field')) {
      this.text = _.get(this.field, this.item);
    }
  }
}
customElements.define('hg-list-editable-text', HgListEditableText);
