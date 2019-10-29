import {LitElement, html, css} from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';

customElements.define('hg-banner', class extends LitElement {
  static get properties() {
    return {
      src: String,
      heading: String,
      subheading: String,
    };
  }
  static get styles() {
    return css`
      :host {
        height: 100vh;
        display: flex;
      }
      iron-image {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;
      }
      .heading {
        background: rgba(20, 44, 60, 0.75);
        padding: 20px;
        width: 1000px;
        max-width: 100%;
        margin: auto auto 0;
        color: white;
        text-align: center;
        text-transform: uppercase;
      }
      h1 {
        font-weight: normal;
        font-size: 50px;
        margin: 10px;
      }
      p {
        font-size: 20px;
        margin: 10px;
      }
    `;
  }
  render() {
    return html`
      <iron-image .src=${this.src} .sizing=${'cover'}></iron-image>
      <div class="heading">
        <h1>${this.heading}</h1>
        <p>${this.subheading}</p>
      </div>
    `;
  }
});
