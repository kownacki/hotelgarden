import {LitElement, html, css} from 'lit';
import '@material/mwc-button';
import '@polymer/paper-dialog';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {ref, listAll} from 'firebase/storage';
import '../../edit/hg-cms-buttons-container.js';
import sharedStyles from '../../styles/shared-styles.js';
import {db, storage} from '../../utils/database.js';
import '../ui/hg-icon-button.js'
import './hg-icons-add/hg-icons-add-text.js';
//todo dodać link do strony icons8

export class HgIconsAdd extends LitElement {
  static properties = {
    disable: Boolean,
    _availableIcons: Array,
    _categories: Array,
    _selected: String,
    _loading: Boolean,
  };
  static styles = [sharedStyles, css`
    paper-dialog {
      overflow: auto;
    }
    .icons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 0 10px;
      margin: 30px 0;
    }
    .icon {
      width: 80px;
      text-align: center;
      padding: 5px;
    }
    mwc-icon-button {
      --mdc-icon-size: 60px;
    }
    hg-icons-add-text {
      margin: 20px 0;
    }
  `];
  constructor() {
    super();
    (async () => {
      const categories = (await listAll(ref(storage, 'icons'))).prefixes
        .map((prefix) => prefix.name)
        .filter((category) => category !== 'other');
      categories.push('other');

      this._categories = categories;
      this.shadowRoot.getElementById('dialog')?.notifyResize();

      // odtwórz icons w firestore na podstawie icons w storage
      // this._categories.map(async (category) => {
      //   const iconsRefs = (await storage.ref(`icons/${category}`).listAll()).items;
      //   const urls = await Promise.all(_.map(_.method('getDownloadURL'), iconsRefs));
      //   Promise.all(_.map.convert({cap: false})((url, index) => {
      //     return db.collection('icons').add({category, url, name: iconsRefs[index].name.replace('.png', '')});
      //   }, urls)).then(() => console.log(category));
      // });
    })();
  }
  async updated(changedProperties) {
    if (changedProperties.has('_selected') && this._selected) {
      this._loading = true;
      const selected = this._selected;
      const iconsQuerySnapshot = await getDocs(query(collection(db, 'icons'), where('category', '==', selected)));
      const icons = iconsQuerySnapshot.docs.map((iconDocSnapshot) => iconDocSnapshot.data());
      // Avoid race condition. Title could change while query was going. Only use result if it's still relevant.
      if (selected === this._selected) {
        this._availableIcons = icons;
        this._loading = false;
        this.shadowRoot.getElementById('dialog').notifyResize();
      }
    }
  }
  async getIcon() {
    this._selected = null;
    this.shadowRoot.getElementById('dialog').open();
    return new Promise((resolve) => {
      this.addEventListener('icon-selected', (event) => {
        if (event.detail) {
          this.shadowRoot.getElementById('dialog').close();
          const iconText = this.shadowRoot.getElementById('text').text || '';
          resolve({text: iconText, url: event.detail});
        } else {
          resolve(false);
        }
      }, {once: true});
    });
  }
  render() {
    return html`
      <paper-dialog 
        id="dialog"
        class="cms"
        @opened-changed=${(event) => {
          if (!event.detail.value) {
            this.dispatchEvent(new CustomEvent('icon-selected', {detail: false}))
          }
        }}>
        <div>Dodaj ikonę</div>
        <hg-icons-add-text
          id="text">
        </hg-icons-add-text>
        <hg-cms-buttons-container .alignToLeft=${true}>
          ${!this._categories ? 'loading...' : this._categories.map((category) => html`
            <mwc-button
              .outlined=${category !== this._selected}
              .raised=${category === this._selected}
              .dense=${true}
              .label=${category.replace('-', ' ')}
              @click=${() => this._selected = category}>
            </mwc-button>
          `)}
        </hg-cms-buttons-container>
        <div class="icons">
          <!--todo This can lag a bit due to how many images are rendered. Optimize. -->
          ${this._loading ? 'loading...' : !this._selected ? '' : _.map((icon) => html`
            <div class="icon">
              <hg-icon-button
                .size=${'large'}
                @click=${() => {
                  this.dispatchEvent(new CustomEvent('icon-selected', {detail: icon.url}));
                }}>
                <img src=${icon.url} alt=${`${icon.name} icon`}/>
              </hg-icon-button>
              <div>${icon.name}</div>
            </div>
          `, this._availableIcons)}
        </div>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-icons-add', HgIconsAdd);
