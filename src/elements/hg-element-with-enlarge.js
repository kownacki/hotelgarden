import {LitElement, html, css} from 'lit';

export class HgElementWithEnlarge extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      overflow: hidden;
    }
    ::slotted(*) {
      width: 100%;
      height: 100%;
      transition: width 0.1s linear, height 0.1s linear, margin 0.1s linear, filter 0.1s linear;
    }
    paper-icon-button {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 0 50%;
      color: white;
      --paper-icon-button-ink-color: transparent;
      transition: padding 0.1s linear;
    }
    @media all and (min-width: 960px) {
      :host(:hover) ::slotted(*) {
        margin: -5% -5%;
        width: 110%;
        height: 110%;
        filter: brightness(50%);
      }
      :host(:hover) paper-icon-button {
        padding: 0 calc(50% - 24px);
      }
    }
  `;
  render() {
    return html`
      <slot></slot>
      <paper-icon-button noink .icon=${'zoom-out-map'}></paper-icon-button>
    `;
  }
}
customElements.define('hg-element-with-enlarge', HgElementWithEnlarge);
