import {LitElement, html, css} from 'lit';
import 'mkwc/fixes/mwc-icon-button-fixed.js';

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
    .zoom-container {
      inset: 0;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    mwc-icon-button-fixed {
      color: white;
      --mdc-icon-fixed-size-transition: 0.1s linear;
      --mdc-icon-size: 0;
      --mdc-ripple-color: transparent;
      visibility: hidden;
    }
    @media all and (min-width: 960px) {
      :host(:hover) ::slotted(*) {
        margin: -5% -5%;
        width: 110%;
        height: 110%;
        filter: brightness(50%);
      }
      :host(:hover) {
        cursor: pointer;
      }
      :host(:hover) mwc-icon-button-fixed {
        --mdc-icon-size: 48px;
        visibility: visible;
      }
    }
  `;
  render() {
    return html`
      <slot></slot>
      <div class="zoom-container">
        <mwc-icon-button-fixed .icon=${'zoom_out_map'}></mwc-icon-button-fixed>
      </div>
    `;
  }
}
customElements.define('hg-element-with-enlarge', HgElementWithEnlarge);
