import {LitElement, html, css} from 'lit';
import {throttle, range, size} from 'lodash-es';
import {createDbPath, getFromDb} from '../utils/database.js'
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import {scrollIntoView} from '../utils.js';
import './hg-menu/hg-menu-main.js';
import './hg-menu/hg-menu-nav.js';

export class HgMenu extends LitElement {
  _firebaseAuth;
  static properties = {
    categories: Object,
    uid: String,
    selectedCategory: Number,
    _compact: Boolean,
    _editing: {type: Boolean, reflect: true, attribute: 'editing'},
    _loggedIn: Boolean,
  };
  static styles = css`
    :host {
      display: block;
      margin: 80px 0;
    }
    section {
      display: flex;
      justify-content: center;
    }
    hg-menu-main {
      flex-grow: 1;
      max-width: 700px;
    }
    hg-menu-nav {
      min-width: 340px;
      transition: opacity 0.3s ease;
    }
    :host([editing]) hg-menu-nav {
      opacity: 50%;
      pointer-events: none;
    }
    @media all and (max-width: 959px) {
      hg-menu-nav {
        min-width: 240px;
        width: 240px;
      }
    }
    /* todo better way to view menu */
    @media all and (max-width: 599px) {
      section {
        display: block;
      }
      hg-menu-nav {
        display: none;
      }
    }
  `;
  constructor() {
    super();

    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });

    this.categories = {};
    this.selectedCategory = 0;
    this._compact = (window.innerWidth < 600);
    window.addEventListener('resize', throttle(
      () => this._compact = (window.innerWidth < 600),
      100,
    ));
  }
  async firstUpdated() {
    this.categories = await getFromDb(createDbPath(`menus/${this.uid}`));
    this._dataReady = true;
  }
  render(){
    return html`
      <section>
        ${(this._compact
          ? range(0, size(this.categories))
          : [this.selectedCategory]
        ).map((categoryIndex) => html`
          <hg-menu-main
            id="main"
            .dataReady=${this._dataReady}
            .uid=${this.uid}
            .category=${this.categories[categoryIndex]}
            .categoryIndex=${categoryIndex}
            .categories=${this.categories}
            .enableEditing=${this._loggedIn}
            @category-changed=${() => this.shadowRoot.getElementById('nav').requestUpdateNavItem()}
            @editing-changed=${(event) => this._editing = event.detail}>
          </hg-menu-main>
        `)}
        <hg-menu-nav
          id="nav"
          .uid=${this.uid}
          .selectedCategory=${this.selectedCategory}
          .categories=${this.categories}
          .enableEditing=${this._loggedIn}
          @categories-changed=${(event) => this.categories = event.detail}
          @selected-category-changed=${(event) => {
            this.selectedCategory = event.detail;
            scrollIntoView(this);
            // update in case if selectedCategory index unchanged but category object did
            // //todo think if more elegant solution
            // this.shadowRoot.getElementById('main').requestUpdate();
            // this.requestUpdate();
          }}>
        </hg-menu-nav>
      </section>
    `;
  }
}
customElements.define('hg-menu', HgMenu);
