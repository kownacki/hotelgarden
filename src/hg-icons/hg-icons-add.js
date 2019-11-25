import {LitElement, html, css} from 'lit-element';
import firebase from "firebase";

//todo dodać link do strony icons8

customElements.define('hg-icons-add', class extends LitElement {
  static get properties() {
    return {
      icons: Array,
      categories: Array,
      selected: String,
      loading: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      this.categories = _.map('name', (await firebase.storage().ref('icons').listAll()).prefixes);
      this.categories = _.remove(_.isEqual('other'), this.categories);
      this.categories.push('other');

      // odtwórz icons w firestore na podstawie icons w storage
      // this.categories.map(async (category) => {
      //   const iconsRefs = (await firebase.storage().ref(`icons/${category}`).listAll()).items;
      //   const urls = await Promise.all(_.map(_.method('getDownloadURL'), iconsRefs));
      //   Promise.all(_.map.convert({cap: false})((url, index) => {
      //     return firebase.firestore().collection('icons').add({category, url, name: iconsRefs[index].name.replace('.png', '')});
      //   }, urls)).then(() => console.log(category));
      // });
    })();
  }
  static get styles() {
    return css`
      paper-icon-button {
        width: 40px;
        height: 40px;
        padding: 0;
      }
      paper-button {
        min-width: auto;
        padding: 5px;
        margin: 2px;
      }
      paper-button[selected] {
        background: var(--primary-color);
        color: white;
      }
      paper-dialog {
        overflow: auto;
      }
    `;
  }
  async updated(changedProperties) {
    if (changedProperties.has('selected') && this.selected) {
      this.loading = true;
      const selected = this.selected;
      const iconsRefs = (await firebase.firestore().collection('icons').where('category', "==", selected).get()).docs;
      const icons = _.map(_.method('data'), iconsRefs);
      // Avoid race condition. Title could change while query was going. Only use result if it's still relevant.
      if (selected === this.selected) {
        this.icons = icons;
        this.loading = false;
      }
    }
  }
  render() {
    return html`
      <paper-icon-button 
        icon="icons:add"
        @click=${() => {
          this.shadowRoot.getElementById('dialog').open(); 
          this.selected = null;
        }}>
      </paper-icon-button>
      <paper-dialog id="dialog">
        <div>Dodaj ikonę</div>
        <div>
          ${_.map((category) => html`
            <paper-button raised @click=${() => this.selected = category} ?selected=${category === this.selected}>
              ${_.replace('-', ' ', category)}
            </paper-button>
          `, this.categories)}
        </div>
        <div>
          <!--todo This can lag a bit due to how many images are rendered. Optimize. -->
          ${this.loading ? 'loading...' : !this.selected ? '' : _.map((icon) => html`
            <paper-icon-button .src=${icon.url} title="${icon.name}"></paper-icon-button>
          `, this.icons)}
        </div>
      </paper-dialog>
    `;
  }
});
