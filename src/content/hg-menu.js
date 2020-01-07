import {LitElement, html, css} from 'lit-element';
import {db} from "../utils.js";
import './hg-menu/hg-menu-main.js';
import './hg-menu/hg-menu-nav.js';
import '../elements/hg-heading.js';

customElements.define('hg-menu', class extends LitElement {
  static get properties() {
    return {
      categories: Object,
      selectedCategory: Number,
      _editing: {type: Boolean, reflect: true, attribute: 'editing'},
    };
  }
  constructor() {
    super();
    this.categories = {};
    this.selectedCategory = 0;
    db.collection("menu").doc("courses").get()
      .then((doc) => {
        this.categories = doc.data();
      });
  }
  static get styles() {
    return css`
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
        transition: opacity 0.3s ease;
      }
      :host([editing]) hg-menu-nav {
        opacity: 50%;
        pointer-events: none;
      }
      @media all and (max-width: 840px) {
        hg-menu-nav {
          display: none;
        }
      }
    `;
  }
  render(){
    return html`
      <hg-heading center>${'Menu restauracji'}</hg-heading>
      <section>
        <hg-menu-main 
          id="main"
          .doc=${'courses'}
          .category=${_.get(this.selectedCategory, this.categories)}
          .categoryIndex=${this.selectedCategory}
          .categories=${this.categories}
          @category-renamed=${() => this.shadowRoot.getElementById('nav').requestUpdateCategoryName()}
          @editing-changed=${(event) => this._editing = event.detail}>
        </hg-menu-main>
        <hg-menu-nav
          id="nav"
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
