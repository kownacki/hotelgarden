import {LitElement, html, css} from 'lit-element';
import './hg-header/hg-header-subnav.js';
import './hg-header/hg-header-logo.js';
import {links} from '../utils.js';

customElements.define('hg-header', class extends LitElement {
  static get properties() {
    return {
      noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
      scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
      selected: String,
    };
  }
  constructor() {
    super();
    window.onscroll = _.throttle(100, () => this.scrolledDown = window.pageYOffset > 0);
  }
  static get styles() {
    return css`
      :host {
        display: block;
        top: 0;
        position: fixed;
        width: 100%;
        z-index: 2;
      }
      :host([scrolled-down]) {
        background: white;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
      }
      header {
        display: flex;
      }
      nav {
        flex: 1;
        background: transparent;
        transition: background-color 0.5s ease;
      }
      ul {
        margin: 10px 0 0 10px;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
      }
      li {
        position: relative;
        list-style-type: none;
        margin-right: 10px;
        padding-bottom: 10px;
      }
      hg-header-subnav {
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 0;
        transition: visibility 0.3s, opacity 0.3s ease, margin 0.3s ease;
        visibility: hidden;
        opacity: 0;
        margin: 10px 0 0;
      }
      li:hover hg-header-subnav {
        visibility: visible;
        opacity: 1.0;
        margin: 0;
      }
      a {
        display: block;
        padding: 10px;
        font-weight: 400;
        color: white;
        text-decoration: none;
        transition: background-color 0.3s ease, color 0.2s ease;
      }
      :host([scrolled-down]) a:not(:hover):not([selected]), :host([no-banner-image]) a:not(:hover):not([selected]) {
        color: var(--primary-color);
      }
      a:hover, a[selected] {
        background: rgba(var(--primary-color-rgb), 90%);
      }
      @media all and (max-width: 1023px) {
        li {
          margin-right: 5px;
        }
        a {
          padding: 10px 7px;
        }
      }
      @media all and (max-width: 959px) {
        
      }
    `;
  }
  render() {
    return html`
      <header>
        <hg-header-logo .scrolledDown=${this.scrolledDown} .noBannerImage=${this.noBannerImage}></hg-header-logo>
        <nav>
          <ul>
            ${_.map((link) => html`
              <li>
                <a 
                  href="${link.path}"
                  ?selected=${link.path === this.selected
                    || (link.path === '/wydarzenia' && _.startsWith('/wydarzenia', this.selected))
                    || _.some(['path', this.selected], link.sublinks)}>
                  ${link.name}
                </a>
                ${!link.sublinks ? '' : html`
                  <hg-header-subnav .links=${link.sublinks} .selected=${this.selected}></hg-header-subnav>
                `}
              </li>
            `, links)}   
          </ul>
        </nav>
      </header>
    `;
  }
});
