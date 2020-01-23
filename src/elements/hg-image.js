import {LitElement, html, css} from 'lit-element';
import {db, getData, updateImage} from "../utils.js";
import HgEditableImage from '../edit/hg-editable-image.js';

customElements.define('hg-image', class extends HgEditableImage {
  static get properties() {
    return {
      // required params
      path: Object, // {doc: String, [field: String]}
      // optional params
      noGetImage: Boolean,
      // private
      image: Object,
    };
  }
  constructor() {
    super();
    this.addEventListener('save', (event) => this.updateImage(event.detail));
  }
  // duplicated from hg-list
  updated(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.path && !this.noGetImage) {
        (async () => {
          this.image = await getData(this.path.doc, this.path.field);
        })();
      }
    }
    if (changedProperties.has('image')) {
      this.src = _.get('url', this.image);
    }
    super.updated(changedProperties);
  }
  async updateImage(file) {
    this.image = await updateImage(this.path.doc, this.path.field, file, (_.get('name', this.image)));
  }
});
