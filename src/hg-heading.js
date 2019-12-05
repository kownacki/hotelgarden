import {LitElement, html, css} from 'lit-element';

customElements.define('hg-heading', class extends LitElement {
  static get properties() {
    return {
      center: {type: Boolean},
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin-bottom: 30px;
        text-transform: uppercase;
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
      <h2 style="text-align: ${this.center ? 'center' : 'initial'}"><slot></slot></h2>
    `;
  }
});
