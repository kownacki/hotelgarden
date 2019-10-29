import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@polymer/iron-image@^3.0.2/iron-image.js?module';

customElements.define('hg-landing', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
      :host {
      }
      iron-image {
        display: block;
        height: 100vh;
        position: static;
      }
    `;
  }
  render(){
    return html`
      <iron-image src="https://picsum.photos/id/174/1920/980" sizing="cover"></iron-image>
    `;
  }
});
