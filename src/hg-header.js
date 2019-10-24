import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import './hg-header-subnav.js';

//todo flat vs hierarchical url structure
const links = [
  {
    name: 'Hotel',
    path: '/',
    sublinks: [
      {name: 'O hotelu', path: '/o-hotelu'},
      {name: 'Villa Garden', path: '/villa-garden'},
      {name: 'Oleśnica i okolice', path: '/olesnica-i-okolice'},
      {name: 'Opinie ', path: '/opinie'},
      {name: 'FAQ ', path: '/faq'},
    ],
  }, {
    name: 'Pokoje',
    path: '/pokoje',
  }, {
    name: 'Konferencje',
    path: '/',
    sublinks: [
      {name: 'Nasze sale', path: '/sale'},
      {name: 'Wigilie Firmowe', path: '/wigilie-firmowe'},
    ],
  }, {
    name: 'Kuchnia',
    path: '/',
    sublinks: [
      {name: 'O naszej kuchni', path: '/o-naszej-kuchni'},
      {name: 'Restauracja Magnolia', path: '/restauracja-magnolia'},
      {name: 'Grill Garden', path: '/grill-garden'},
      {name: 'Catering', path: '/catering'},
    ],
  },
];

class HgHeader extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
      ul {
        display: flex;
      }
      li {
        position: relative;
        padding: 20px;
        list-style-type: none;
      }
      li:hover hg-header-subnav {
       display: block;
      }
      hg-header-subnav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
      }
    `;
  }
  render() {
    return html`
      <nav>
        <ul>
          ${_.map((link) => html`
            <li>
              <a href="${link.path}">${link.name}</a>
              ${link.sublinks ? html`<hg-header-subnav .links=${link.sublinks}></hg-header-subnav>` : ''}
            </li>
          `, links)}   
        </ul>
      </nav>
    `;
  }
}
customElements.define('hg-header', HgHeader);
