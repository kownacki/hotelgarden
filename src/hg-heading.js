import {LitElement, html, css} from 'lit-element';

customElements.define('hg-heading', class extends LitElement {
  static get properties() {
    return {
      text: String,
      center: {type: Boolean},
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
      }
      h2 {
        margin-top: 0;
        font-weight: 300;
        font-size: 40px;
        text-transform: uppercase;
      }
    `;
  }
  render() {
    return html`
      <h2 style="text-align: ${this.center ? 'center' : 'initial'}">${this.text}</h2>
    `;
  }
});
