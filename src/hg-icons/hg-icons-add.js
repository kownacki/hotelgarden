import {LitElement, html, css} from 'lit-element';
import firebase from "firebase";

//todo dodać link do strony icons8

customElements.define('hg-icons-add', class extends LitElement {
  static get properties() {
    return {
      uid: Number,
      icons: Array,
      _availableIcons: Array,
      _categories: Array,
      _selected: String,
      _loading: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      this._categories = _.map('name', (await firebase.storage().ref('icons').listAll()).prefixes);
      this._categories = _.remove(_.isEqual('other'), this._categories);
      this._categories.push('other');

      // odtwórz icons w firestore na podstawie icons w storage
      // this._categories.map(async (category) => {
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
    if (changedProperties.has('_selected') && this._selected) {
      this._loading = true;
      const selected = this._selected;
      const iconsRefs = (await firebase.firestore().collection('icons').where('category', "==", selected).get()).docs;
      const icons = _.map(_.method('data'), iconsRefs);
      // Avoid race condition. Title could change while query was going. Only use result if it's still relevant.
      if (selected === this._selected) {
        this._availableIcons = icons;
        this._loading = false;
      }
    }
  }
  addIcon(event) {
    this.shadowRoot.getElementById('dialog').close();
    const icon = {text: this.shadowRoot.getElementById('text').value, url: event.target.src};
    firebase.firestore().doc('iconBlocks/' + this.uid).update({[this.icons.length]: icon});
    this.icons.push(icon);
    this.dispatchEvent(new CustomEvent('icon-added'));
  };
  render() {
    return html`
      <paper-icon-button 
        icon="icons:add"
        @click=${() => {
          this.shadowRoot.getElementById('dialog').open(); 
          this._selected = null;
        }}>
      </paper-icon-button>
      <paper-dialog id="dialog">
        <div>Dodaj ikonę</div>
        <paper-input
          id="text"
          .label=${'Tekst pod ikoną'}>
        </paper-input>
        <div>
          ${_.map((category) => html`
            <paper-button raised @click=${() => this._selected = category} ?selected=${category === this._selected}>
              ${_.replace('-', ' ', category)}
            </paper-button>
          `, this._categories)}
        </div>
        <div>
          <!--todo This can lag a bit due to how many images are rendered. Optimize. -->
          ${this._loading ? 'loading...' : !this._selected ? '' : _.map((icon) => html`
            <paper-icon-button 
              title="${icon.name}" 
              .src=${icon.url}
              @click=${this.addIcon}>
            </paper-icon-button>
          `, this._availableIcons)}
        </div>
      </paper-dialog>
    `;
  }
});