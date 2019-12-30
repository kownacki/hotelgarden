import {LitElement, html, css} from 'lit-element';

customElements.define('hg-header-logo', class extends LitElement {
  static get properties() {
    return {
      scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
    };
  }
  static get styles() {
    return css`
      :host {
        position: relative;
        margin: 0 20px;
      }
      a {
        display: block;
        width: 170px;
      }
      img {
        display: block;
      }
      .logomark {
        padding: 12px 10px;
        width: 40px;
        margin: auto;
      }
      :host(:not([scrolled-down])) .logomark {
        filter: drop-shadow(0 0 1px white);
      }
      .logotype {
        transition: top 0.5s ease;
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
        padding: 0 10px 10px;
        position: absolute;
        top: 60px;
        width: 150px;
        z-index: -1;
      }
      :host([scrolled-down]) .logotype {
        top: -100px;
      }
    `;
  }
  render() {
    return html`
      <a href="/">
        <img class="logomark" src="/resources/images/logo-logomark.png">
        <img class="logotype" src="/resources/images/logo-logotype.png">
      </a>
    `;
  }
});
