import {LitElement, html, css} from 'lit-element';

customElements.define('hg-header-logo', class extends LitElement {
  static get properties() {
    return {
      noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
      scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
    };
  }
  static get styles() {
    return css`
      :host {
        position: relative;
      }
      a {
        display: block;
        width: 170px;
      }
      img {
        display: block;
      }
      .logomark {
        position: relative;
        top: 10px;
        width: calc((80 / 170) * 100%);
        padding: 12px 10px;
        margin: auto;
        transition: top 0.3s ease, width 0.3s ease;
        filter: drop-shadow(0 0 1px white);
      }
      :host([scrolled-down]) .logomark {
        top: 0;
        width: 40px;
        filter: none;
      }
      .logotype {
        transition: top 0.3s ease, opacity 0.2s ease;
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
        padding: 0 calc((10 / 170) * 100%) 10px;
        position: absolute;
        top: calc((105 / 95) * 100%);
        width: calc((150 / 170) * 100%);
        opacity: 100%;
      }
      :host([no-banner-image]) .logotype {
        filter: invert(100%) var(--logotype-color-filter);
      }
      :host([scrolled-down]) .logotype {
        pointer-events: none;
        top: 65px;
        opacity: 0;
      }
      @media all and (max-width: 1279px) {
        a {
          width: 120px;
        }
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
