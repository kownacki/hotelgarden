import {LitElement, html, css} from 'lit-element';

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
        box-shadow: inset 0 50px 50px rgba(80, 80, 80, 0.50);
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
        background: rgba(64, 49, 52, 0.57);
        padding: 20px;
        width: 1000px;
        max-width: 100%;
        margin: auto auto 0;
        color: white;
        text-align: center;
        text-transform: uppercase;
      }
      h1 {
        font-size: 50px;
        margin: 10px;
        font-weight: 300;
      }
      p {
        font-size: 18px;
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
