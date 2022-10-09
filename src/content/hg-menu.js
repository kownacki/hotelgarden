import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {throttle, range, size} from 'lodash-es';
import {createDbPath, getFromDb, DbPath, updateDataOrImageInObjectInDb} from '../utils/database.js'
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import {ItemsDbSyncController} from '../utils/ItemsDbSyncController.js';
import {scrollIntoView} from '../utils.js';
import './hg-menu/hg-menu-main.js';
import './hg-menu/hg-menu-nav.js';

export class HgMenu extends LitElement {
  _firebaseAuth;
  _categoriesDbSync;
  static properties = {
    // required params
    uid: String,
    // private
    _path: DbPath,
    _categoriesReady: Boolean,
    _categories: Object,
    _selectedCategory: Number,
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

    this._categoriesDbSync = new ItemsDbSyncController(
      this,
      async (path) => await getFromDb(path) || {},
      async (path, index, {field, data}, oldItem, items) => {
        const updatedData = await updateDataOrImageInObjectInDb(field, path, `${index}.${field}`, data, items);
        return {
          ...oldItem,
          [field]: updatedData,
        };
      },
      (categoriesReady) => this._categoriesReady = categoriesReady,
      (categories) => {
        this._categories = categories;
        this._selectedCategory = 0;
      },
    );

    this._compact = (window.innerWidth < 600);

    window.addEventListener('resize', throttle(
      () => this._compact = (window.innerWidth < 600),
      100,
    ));
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`menus/${this.uid}`)
      this._categoriesDbSync.setPath(this._path);
    }
  }
  render(){
    return html`
      <section>
        ${when(
          this._categoriesReady,
          () => html`
            ${(this._compact
              ? range(0, size(this._categories))
              : [this._selectedCategory]
            ).map((categoryIndex) => html`
              <hg-menu-main
                id="main"
                .category=${this._categories[categoryIndex]}
                .categoryIndex=${categoryIndex}
                .categories=${this._categories}
                .enableEditing=${this._loggedIn}
                @editing-changed=${({detail: editing}) => {
                  this._editing = editing;
                }}
                @request-category-field-change=${({detail: {field, data}}) => {
                  this._categoriesDbSync.requestItemUpdate(categoryIndex, {field, data});
                }}>
              </hg-menu-main>
            `)}
            <hg-menu-nav
              id="nav"
              .uid=${this.uid}
              .selectedCategory=${this._selectedCategory}
              .categories=${this._categories}
              .enableEditing=${this._loggedIn}
              @categories-changed=${(event) => this._categories = event.detail}
              @selected-category-changed=${(event) => {
                this._selectedCategory = event.detail;
                scrollIntoView(this);
                //!!!!
                // update in case if selectedCategory index unchanged but category object did
                // //todo think if more elegant solution
                // this.shadowRoot.getElementById('main').requestUpdate();
                // this.requestUpdate();
              }}>
            </hg-menu-nav>
          `,
        )}
      </section>
    `;
  }
}
customElements.define('hg-menu', HgMenu);
