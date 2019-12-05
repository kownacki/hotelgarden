import {LitElement, html, css} from 'lit-element';
import {db} from "../../utils.js";
import './hg-menu-main.js';
import './hg-menu-nav.js';
import '../../hg-heading.js';

customElements.define('hg-menu', class extends LitElement {
  static get properties() {
    return {
      categories: Array,
      selectedCategory: Number,
    };
  }
  constructor() {
    super();
    this.categories = [];
    this.selectedCategory = 0;
    db.collection("menu").doc("courses").get()
      .then((doc) => {
        this.categories = _.toArray(doc.data());
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
      @media all and (max-width: 840px) {
        hg-menu-nav {
          display: none;
        }
      }
    `;
  }
  render(){
    return html`
      <hg-heading .text=${'Menu restauracji'} center></hg-heading>
      <section>
        <hg-menu-main id="main" .category=${this.categories[this.selectedCategory]} .categories=${this.categories}></hg-menu-main>
        <hg-menu-nav
          .selectedCategory=${this.selectedCategory}
          .categories=${this.categories}
          @selected-category-changed=${(event) => {
            this.selectedCategory = event.detail;
            // update in case if selectedCategory index unchanged but category object did
            //todo think if more elegant solution
            this.shadowRoot.getElementById('main').requestUpdate();
            this.requestUpdate();
          }}
          @category-renamed=${() => this.shadowRoot.getElementById('main').requestUpdate()}>
        </hg-menu-nav>
      </section>
    `;
  }
});
