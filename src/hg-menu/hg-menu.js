import { LitElement, html, css } from 'https://unpkg.com/lit-element@^2.2.1/lit-element.js?module';
import 'https://unpkg.com/@material/mwc-button@^0.9.1/mwc-button.js?module';
import './hg-menu-main.js';
import './hg-menu-nav.js';

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

    firebase.firestore().collection("menu").doc("courses").get()
      .then((doc) => {
        this.categories = _.toArray(doc.data());
      });
  }
  static get styles() {
    return css`
      :host {
        display: flex;
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
    `;
  }
});
