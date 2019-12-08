import {LitElement, html, css} from 'lit-element';
import './hg-header-subnav.js';
import {links} from '../utils.js';

customElements.define('hg-header', class extends LitElement {
  static get properties() {
    return {
      _scrolledDown: Boolean,
      selected: String,
    };
  }
  constructor() {
    super();
    window.onscroll = _.throttle(100, () => this._scrolledDown = window.pageYOffset > this.offsetHeight);
  }
  static get styles() {
    return css`
      :host {
        display: block;
        position: fixed;
        width: 100%;
        z-index: 2;
      }
      nav {
        transition: background-color 0.5s ease, color 0.2s ease, text-shadow 0.5s ease;;
        display: block;
        background: transparent;
        color: white;
      }
      nav.scrolled-down {
        text-shadow: none;
        background: white;
        color: var(--primary-color);
        box-shadow: 2px 4px 10px rgba(0,0,0,.2);
      }
      ul {
        margin: 0;
        display: flex;
      }
      li {
        position: relative;
        list-style-type: none;
        margin-right: 10px;
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
      li:hover  hg-header-subnav {
        visibility: visible;
        opacity: 1.0;
        margin: 0;
      }
      a {
        display: block;
        padding: 10px;
        margin: 10px 0;
        font-weight: 400;
        color: inherit;
        text-decoration: none;
        transition: background-color 0.3s ease;
      }
      a:hover, a[selected] {
        background: rgba(var(--primary-color-rgb), 90%);
        color: white;
      }
    `;
  }
  render() {
    return html`
      <header>
        <nav class=${this._scrolledDown ? 'scrolled-down' : ''}>
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
