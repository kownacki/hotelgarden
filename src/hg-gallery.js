import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/iron-image@^3.0.2/iron-image.js?module';

class HgGallery extends LitElement {
  static get properties() {
    return {
      urls: Array,
    };
  }
  constructor() {
    super();
    (async () => {
      const storageItems = (await firebase.storage().ref('gallery').listAll()).items;
      this.urls = await Promise.all(_.map(_.method('getDownloadURL'), storageItems));
    })();
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: auto;
        max-width: 1300px;
      }
      .images {
        display: flex;
        flex-wrap: wrap;
      }
      iron-image {
        margin: 1px;
        width: calc(50% - 2px);
        padding-bottom: 30%;
      }
    `;
  }
  render() {
    return html`
      <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg"
        @change=${async (event) => {
          const file = event.target.files[0];
          event.target.value = '';
          const ref = firebase.storage().ref('gallery/' + Date.now());
          await ref.put(file);
          this.urls.push(await ref.getDownloadURL());
          this.requestUpdate();
        }}>
        <div class="images">
          ${_.map((url) => html`<iron-image src="${url}" sizing="cover"></iron-image>`, _.reverse(this.urls))}
        </div>
    `;
  }
}
customElements.define('hg-gallery', HgGallery);
