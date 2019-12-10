import {LitElement, html, css} from 'lit-element';

customElements.define('hg-heading', class extends LitElement {
  static get properties() {
    return {
      center: {type: Boolean, reflect: true},
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 30px;
        text-transform: uppercase;
      }
      :host([center]) {
        text-align: center;
        margin: 60px 0;
      }
      h2 {
        margin: 0;
        font-weight: 300;
        font-size: 40px;
      }
    `;
  }
  render() {
    return html`
      <h2 id="editable"><slot></slot></h2>
    `;
  }
});
