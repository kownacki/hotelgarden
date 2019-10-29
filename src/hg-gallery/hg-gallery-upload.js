import {LitElement, html, css} from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/paper-icon-button@^3.0.2/paper-icon-button.js?module';
import 'https://unpkg.com/@polymer/iron-icons@^3.0.1/iron-icons.js?module';

customElements.define('hg-gallery-upload', class extends LitElement {
  static get properties() {
    return {
      images: Array,
    };
  }
  static get styles() {
    return css`
      input {
        display: none;
      }
    `;
  }
  render() {
    return html`
      <paper-icon-button 
        icon="icons:add"
        @click=${() => this.shadowRoot.getElementById('input').click()}>
      </paper-icon-button>
      <input
        id="input"
        type="file"
        accept="image/png, image/jpeg"
        @change=${async (event) => {
          const file = event.target.files[0];
          event.target.value = '';
          const image = {name: Date.now()};
          // First unshift images and then asynchronously set url to prevent from 
          // race condition when another image is added immediately
          this.images.unshift(image);
          this.dispatchEvent(new CustomEvent('upload-started'));
          const ref = firebase.storage().ref('gallery/' + image.name);
          await ref.put(file);
          image.url = await ref.getDownloadURL();
          this.dispatchEvent(new CustomEvent('upload-finished'));
      }}>
    `;
  }
});
