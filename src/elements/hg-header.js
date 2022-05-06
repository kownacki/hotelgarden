import {LitElement, html, css} from 'lit';
import {isDynamicPath, staticPathToPageUid, pagesStaticData, links, createDynamicPath} from '../../utils/urlStructure.js';
import './ui/hg-icon-button.js';
import './hg-header/hg-header-subnav.js';
import './hg-header/hg-header-logo.js';
import './hg-book/hg-book-order-button.js';

export class HgHeader extends LitElement {
  static properties = {
    noBannerImage: {type: Boolean, reflect: true, attribute: 'no-banner-image'},
    scrolledDown: {type: Boolean, reflect: true, attribute: 'scrolled-down'},
    selected: String,
    promotedEventData: Object, // EventData | undefined
    promotedEventLoaded: Boolean,
  };
  static styles = css`
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
    hg-icon-button {
      display: none;
      margin: 8px;
      color: white;
      position: absolute;
    }
    hg-header-logo {
      align-self: center;
      margin: 0 20px;
    }
    :host([scrolled-down]) hg-icon-button, :host([no-banner-image]) hg-icon-button {
      color: var(--primary-color);
    }
    hg-book-order-button {
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
      hg-book-order-button {
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
      hg-icon-button {
        display: block;
      }
      hg-header-logo {
        position: absolute;
        top: 0;
        left: calc(50% - 60px);
        margin: 0;
      }
      hg-book-order-button {
        margin: 9px 15px;
      }
      nav {
        flex: none;
        margin-left: auto;
      }
    }
    @media all and (max-width: 479px) {
      hg-book-order-button {
        margin: 7px 5px 6px;
      }
    }
  `;
  constructor() {
    super();
    window.addEventListener('scroll', _.throttle(100, () => this.scrolledDown = window.pageYOffset > 0));
  }
  render() {
    return html`
      <header>
        ${!this.promotedEventLoaded ? ''
          : html`
            <hg-icon-button
              .size=${'normal'}
              .icon=${'menu'}
              @click=${() => this.dispatchEvent(new CustomEvent('open-drawer'))}>
            </hg-icon-button>
          `}
        <hg-header-logo .scrolledDown=${this.scrolledDown} .noBannerImage=${this.noBannerImage}></hg-header-logo>
        <nav>
          <ul>
            ${!this.promotedEventLoaded ? '' : html`
              ${!this.promotedEventData ? '' : html`
                <li class="event">
                  <a href=${createDynamicPath(this.promotedEventData.uid)}>
                    ${this.promotedEventData.event.title}
                  </a>
                </li>
              `}
              ${links.map((link) => html`
                <li>
                  <a 
                    href="${link.path}"
                    ?selected=${link.path === this.selected
                      || (link.path === '/wydarzenia' && (this.selected === '/wydarzenia' || isDynamicPath(this.selected)))
                      || _.includes(staticPathToPageUid[this.selected], link.sublinks)}>
                    ${link.name}
                  </a>
                  ${!link.sublinks ? '' : html`
                    <hg-header-subnav .links=${link.sublinks} .selected=${this.selected}></hg-header-subnav>
                  `}
                </li>
              `)}
            `}
          </ul>
          <hg-book-order-button
            .order=${(staticPathToPageUid[this.selected] && (pagesStaticData[staticPathToPageUid[this.selected]].dir === 'restaurant'))
              ? 'restaurant'
              : null}>
          </hg-book-order-button>
        </nav>
      </header>
    `;
  }
}
customElements.define('hg-header', HgHeader);
