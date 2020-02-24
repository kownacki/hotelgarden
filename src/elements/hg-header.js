import {LitElement, html, css} from 'lit-element';
import moment from 'moment';
import {pathToUid, links} from '../utils.js';
import './hg-header/hg-header-subnav.js';
import './hg-header/hg-header-logo.js';
import './hg-book/hg-book-button.js';

customElements.define('hg-header', class extends LitElement {
  static get properties() {
    return {
      noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
      scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
      selected: String,
      promotedEvent: Object,
      promotedEventLoaded: Boolean,
    };
  }
  constructor() {
    super();
    window.addEventListener('scroll', _.throttle(100, () => this.scrolledDown = window.pageYOffset > 0));
  }
  static get styles() {
    return css`
      :host {
        font-size: 16px;
        display: block;
        top: 0;
        position: fixed;
        width: 100%;
        z-index: var(--layer-header);
      }
      :host([scrolled-down]) {
        background: white;
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.2);
      }
      header {
        display: flex;
      }
      nav {
        align-self: flex-start;
        display: flex;
        flex: 1;
        background: transparent;
        transition: background-color 0.5s ease;
      }
      ul {
        margin: 0 0 0 10px;
        padding: 0;
        display: flex;
        align-items: center;
      }
      li {
        position: relative;
        list-style-type: none;
        margin-right: 10px;
        padding: 10px 0;
      }
      li.event {
        padding: 0;
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
      li:hover hg-header-subnav {
        visibility: visible;
        opacity: 1.0;
        margin: 0;
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
      :host([scrolled-down]) a:not(:hover):not([selected]), :host([no-banner-image]) a:not(:hover):not([selected]) {
        color: var(--primary-color);
      }
      a:hover, a[selected] {
        background: rgba(var(--primary-color-rgb), 90%);
      }
      paper-icon-button {
        display: none;
        width: 44px;
        height: 44px;
        margin: 8px;
        color: white;
        position: absolute;
      }
      hg-header-logo {
        align-self: center;
        margin: 0 20px;
      }
      :host([scrolled-down]) paper-icon-button, :host([no-banner-image]) paper-icon-button {
        color: var(--primary-color);
      }
      hg-book-button {
        align-self: center;
        margin: 9px 15px 9px auto;
      }
      @media all and (max-width: 1279px) {
        li {
          margin-right: 5px;
        }
        a {
          padding: 10px 7px;
        }
        hg-book-button {
          margin: 9px 7px 9px auto;
        }
        hg-header-logo {
          margin: 0 10px;
        }
      }
      @media all and (max-width: 1099px) {
        ul {
          display: none;
        }
        paper-icon-button {
          display: block;
        }
        hg-header-logo {
          margin: auto;
        }
        hg-book-button {
          margin: 9px 15px;
        }
        nav {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      @media all and (max-width: 479px) {
        hg-book-button {
          margin: 9px 5px;
        }
      }
    `;
  }
  render() {
    return html`
      <header>
        ${!this.promotedEventLoaded ? ''
          : html`<paper-icon-button .icon=${'menu'} @click=${() => this.dispatchEvent(new CustomEvent('open-drawer'))}></paper-icon-button>`}
        <hg-header-logo .scrolledDown=${this.scrolledDown} .noBannerImage=${this.noBannerImage}></hg-header-logo>
        <nav>
          <ul>
            ${!this.promotedEvent || moment().isAfter(this.promotedEvent.date, 'day') ? '' 
              : html`<li class="event"><a href="/wydarzenia/${this.promotedEvent.uid}">${this.promotedEvent.title}</a></li>`}
            ${!this.promotedEventLoaded ? '' :_.map((link) => html`
              <li>
                <a 
                  href="${link.path}"
                  ?selected=${link.path === this.selected
                    || (link.path === '/wydarzenia' && _.startsWith('/wydarzenia', this.selected))
                    || _.includes(pathToUid[this.selected], link.sublinks)}>
                  ${link.name}
                </a>
                ${!link.sublinks ? '' : html`
                  <hg-header-subnav .links=${link.sublinks} .selected=${this.selected}></hg-header-subnav>
                `}
              </li>
            `, links)}
          </ul>
          <hg-book-button></hg-book-button>
        </nav>
      </header>
    `;
  }
});
