import {LitElement, html, css} from 'lit';

//todo dodać link do strony icons8

export class HgIconsAdd extends LitElement {
  static properties = {
    disable: Boolean,
    _availableIcons: Array,
    _categories: Array,
    _selected: String,
    _loading: Boolean,
  };
  static styles = css`
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
    paper-icon-button {
      width: 60px;
      height: 60px;
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
  constructor() {
    super();
    (async () => {
      this._categories = _.map('name', (await storage.ref('icons').listAll()).prefixes);
      this._categories = _.remove(_.isEqual('other'), this._categories);
      this._categories.push('other');

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
      const iconsRefs = (await db.collection('icons').where('category', "==", selected).get()).docs;
      const icons = _.map(_.method('data'), iconsRefs);
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
          resolve({text: this.shadowRoot.getElementById('text').value, url: event.detail});
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
        @opened-changed=${(event) => {
          if (!event.detail.value) {
            this.dispatchEvent(new CustomEvent('icon-selected', {detail: false}))
          }
        }}>
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
        <div class="icons">
          <!--todo This can lag a bit due to how many images are rendered. Optimize. -->
          ${this._loading ? 'loading...' : !this._selected ? '' : _.map((icon) => html`
            <div class="icon">
              <paper-icon-button
                .src=${icon.url}
                @click=${(event) => this.dispatchEvent(new CustomEvent('icon-selected', {detail: event.target.src}))}>
              </paper-icon-button>
              <div>${icon.name}</div>
            </div>
          `, this._availableIcons)}
        </div>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-icons-add', HgIconsAdd);
