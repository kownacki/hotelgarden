import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import sharedStyles from '../../styles/shared-styles.js';
import './hg-header-subnav.js';

export class HgHeaderItem extends LitElement {
  static properties = {
    path: String,
    name: String,
    isSelected: Boolean,
    subitems: Array, // { name: string, path: string }[]
    selectedSubitemIndex: Number,
    noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
    scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      position: relative;
      padding: 0 0 10px;
    }
    a {
      text-align: center;
      display: block;
      padding: 10px;
      font-weight: 400;
      color: white;
      text-decoration: none;
      transition: background-color 0.3s ease, color 0.2s ease;
    }
    a:hover, a[selected] {
      background: rgba(var(--primary-color-rgb), 90%);
    }
    :host([scrolled-down]) a:not(:hover):not([selected]), :host([no-banner-image]) a:not(:hover):not([selected]) {
      color: var(--primary-color);
    }
    hg-header-subnav {
      position: absolute;
      top: 100%;
      left: 0;
      transition: visibility 0.3s, opacity 0.3s ease, margin 0.3s ease;
      visibility: hidden;
      opacity: 0;
      margin: 10px 0 0;
    }
    :host(:hover) hg-header-subnav {
      visibility: visible;
      opacity: 1.0;
      margin: 0;
    }
    @media all and (max-width: 1279px) {
      a {
        padding: 10px 7px;
      }
    }
  `];
  render() {
    return html`
      <a href="${this.path}" ?selected=${this.isSelected}>
        ${this.name}
      </a>
      ${when(
        this.subitems,
        () => html`
          <hg-header-subnav .subitems=${this.subitems} .selectedSubitemIndex=${this.selectedSubitemIndex}>
          </hg-header-subnav>
        `,
      )}
    `;
  }
}
customElements.define('hg-header-item', HgHeaderItem);
