import {LitElement, html, css} from 'lit-element';
import {db} from "../utils.js";
import './hg-menu/hg-menu-main.js';
import './hg-menu/hg-menu-nav.js';
import '../elements/hg-heading.js';

customElements.define('hg-menu', class extends LitElement {
  static get properties() {
    return {
      categories: Object,
      uid: String,
      selectedCategory: Number,
      _compact: Boolean,
      _editing: {type: Boolean, reflect: true, attribute: 'editing'},
    };
  }
  constructor() {
    super();
    this.categories = {};
    this.selectedCategory = 0;
    this.categories = {};
    (async () => {
      await this.updateComplete;
      this.categories = (await db.doc('menus/' + this.uid).get()).data();
      this._dataReady = true;
    })();
    this._compact = (window.innerWidth < 600);
    window.addEventListener('resize', _.throttle(100, () => this._compact = (window.innerWidth < 600)));
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 80px 0;
      }
      section {
        display: flex;
        justify-content: center;
      }
      mwc-button {
        --mdc-theme-primary: red;
        --mdc-theme-on-primary: yellow;
      }
      hg-menu-main {
        flex-grow: 1;
        max-width: 700px;
      }
      hg-menu-nav {
        width: 340px;
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
  }
  render(){
    return html`
      <section>
        ${_.map((category) => html`
          <hg-menu-main
            id="main"
            .dataReady=${this._dataReady}
            .uid=${this.uid}
            .category=${_.get(category, this.categories)}
            .categoryIndex=${category}
            .categories=${this.categories}
            @category-changed=${() => this.shadowRoot.getElementById('nav').requestUpdateNavItem()}
            @editing-changed=${(event) => this._editing = event.detail}>
          </hg-menu-main>
        `, this._compact ? _.range(0, _.size(this.categories)) : [this.selectedCategory])}
        <hg-menu-nav
          id="nav"
          .uid=${this.uid}
          .selectedCategory=${this.selectedCategory}
          .categories=${this.categories}
          @categories-changed=${(event) => this.categories = event.detail}
          @selected-category-changed=${(event) => {
            this.selectedCategory = event.detail;
            // update in case if selectedCategory index unchanged but category object did
            // //todo think if more elegant solution
            // this.shadowRoot.getElementById('main').requestUpdate();
            // this.requestUpdate();
          }}>
        </hg-menu-nav>
      </section>
    `;
  }
});
