import {LitElement, html, css, unsafeCSS} from 'lit';

const CONTAINER_WIDTH = 170;
const CONTAINER_WIDTH_SMALL = 120;

const LOGOMARK_WIDTH = 150;
const LOGOMARK_HEIGHT = 115;

const LOGOTYPE_WIDTH = 150;
const LOGOTYPE_HEIGHT = 7;

export class HgHeaderLogo extends LitElement {
  static properties = {
    noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
    scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
  };
  static styles = css`
    :host {
      position: relative;
    }
    a {
      display: block;
      ${unsafeCSS(`
        width: ${CONTAINER_WIDTH}px;
      `)}
    }
    img {
      display: block;
    }
    .logomark {
      position: relative;
      top: 10px;
      width: calc((${LOGOMARK_WIDTH} / ${CONTAINER_WIDTH}) * 100%);
      padding: 10px calc((10 / ${CONTAINER_WIDTH}) * 100%) 0;
      margin: auto;
      transition: top 0.4s ease, width 0.4s ease;
      filter: invert(100%) drop-shadow(0 0 8px rgba(0, 0, 0, 0.25));
    }
    :host([scrolled-down]) .logomark {
      top: 0;
      width: 50px;
      padding: 10px calc((10 / ${CONTAINER_WIDTH}) * 100%);
      filter: var(--primary-color-filter);
    }
    .logotype {
      transition: top 0.2s ease, opacity 0.2s ease;
      filter: invert(100%) drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
      padding: calc((${LOGOTYPE_HEIGHT} / ${CONTAINER_WIDTH}) * 100%) calc((10 / ${CONTAINER_WIDTH}) * 100%) 10px;
      position: absolute;
      top: calc((105 / 95) * 100%);
      width: calc((${LOGOTYPE_WIDTH} / ${CONTAINER_WIDTH}) * 100%);
      opacity: 100%;
    }
    :host([no-banner-image]) .logomark, :host([no-banner-image]) .logotype {
      filter: var(--primary-color-filter);
    }
    :host([scrolled-down]) .logotype {
      pointer-events: none;
      top: 65px;
      opacity: 0;
    }
    @media all and (max-width: 1279px) {
      a {
        ${unsafeCSS(`
          width: ${CONTAINER_WIDTH_SMALL}px;
        `)
      }
    }
  `;
  render() {
    return html`
      <a href="/">
        <img class="logomark" src="/resources/images/logo-logomark.png">
        <img class="logotype" src="/resources/images/logo-logotype.png">
      </a>
    `;
  }
}
customElements.define('hg-header-logo', HgHeaderLogo);
