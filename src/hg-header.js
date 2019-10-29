import {LitElement, html, css} from 'lit-element';
import './hg-header-subnav.js';

//todo flat vs hierarchical url structure
const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: [
      {name: 'O hotelu', path: '/'},
      {name: 'Villa Garden', path: '/'},
      {name: 'Oleśnica i okolice', path: '/'},
      {name: 'Opinie ', path: '/'},
      {name: 'FAQ ', path: '/'},
    ],
  }, {
    name: 'Pokoje',
    path: '/pokoje',
  }, {
    name: 'Konferencje',
    path: '/konferencje',
    sublinks: [
      {name: 'Nasze sale', path: '/konferencje'},
      {name: 'Wigilie Firmowe', path: '/konferencje'},
    ],
  }, {
    name: 'Kuchnia',
    path: '/kuchnia',
    sublinks: [
      {name: 'O naszej kuchni', path: '/kuchnia'},
      {name: 'Restauracja Magnolia', path: '/kuchnia'},
      {name: 'Grill Garden', path: '/kuchnia'},
      {name: 'Catering', path: '/kuchnia'},
    ],
  }, {
    name: 'Galeria',
    path: '/galeria',
  },
];

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
        z-index: 1;
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
        background: rgba(var(--primary-color-rgb), 85%);
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
                <a href="${link.path}" ?selected=${this.selected === link.path}>${link.name}</a>
                ${link.sublinks ? html`<hg-header-subnav .links=${link.sublinks}></hg-header-subnav>` : ''}
              </li>
            `, links)}   
          </ul>
        </nav>
      </header>
    `;
  }
});
