import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {throttle, range, size, toArray} from 'lodash-es';
import {HgListOldItemsChangeType} from '../elements/hg-list-old.js';
import {
  createDbPath,
  getFromDb,
  DbPath,
  updateDataOrImageInObjectInDb,
  updateInDb,
  deleteImageInDb,
} from '../utils/database.js'
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
    _displayedCategories: Object,
    _selectedCategoryIndex: Number,
    _compact: Boolean,
    _isEditingCategoryName: Boolean,
    _isEditingCategoryItemsText: Boolean,
    _isEditing: {type: Boolean, reflect: true, attribute: 'is-editing'},
    _loggedIn: Boolean,
    _isUpdating: Boolean,
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
    :host([is-editing]) hg-menu-nav {
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
      {
        getItems: async (path) => await getFromDb(path) || {},
        updateItem: async (path, index, {type, dataPath, data}, oldItem, items) => {
          const updatedData = await updateDataOrImageInObjectInDb(type, path, `${index}.${dataPath}`, data, items);
          return _.set(dataPath, updatedData, oldItem);
        },
        updateAllItems: async (path, data) => {
          await updateInDb(path, data);
          return data;
        },
        onDataReadyChange: (categoriesReady) => this._categoriesReady = categoriesReady,
        onDataChange: (categories) => {
          this._categories = categories;
        },
        onIsUpdatingChange: (isUpdating) => {
          this._isUpdating = isUpdating;
        },
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
      this._selectedCategoryIndex = 0;
    }
    if (changedProperties.has('_loggedIn')) {
      this._selectedCategoryIndex = 0;
    }
    if (changedProperties.has('_loggedIn') || changedProperties.has('_categories')) {
      this._displayedCategories = this._loggedIn
        ? this._categories
        : {
          ...toArray(this._categories).filter((category) => {
            return category.public;
          })
        };
    }
    if (changedProperties.has('_isEditingCategoryName') || changedProperties.has('_isEditingCategoryItemsText')) {
      this._isEditing = this._isEditingCategoryName || this._isEditingCategoryItemsText;
    }
  }
  render() {
    const disableControls = this._isEditing || this._isUpdating;
    return html`
      <section>
        ${when(
          this._categoriesReady,
          () => html`
            ${(this._compact
              ? range(0, size(this._displayedCategories))
              : [this._selectedCategoryIndex]
            ).map((categoryIndex) => html`
              <hg-menu-main
                id="main"
                .category=${this._displayedCategories[categoryIndex] || {}}
                .categoryIndex=${categoryIndex}
                .categories=${this._displayedCategories}
                .showControls=${this._loggedIn}
                .disableControls=${disableControls}
                @editing-category-name-changed=${({ detail: isEditingCategoryName }) => {
                  this._isEditingCategoryName = isEditingCategoryName;
                }}
                @editing-category-items-text-changed=${({ detail: isEditingCategoryItemsText }) => {
                  this._isEditingCategoryItemsText = isEditingCategoryItemsText;
                }}
                @request-category-field-change=${({detail: {type, dataPath, data}}) => {
                  this._categoriesDbSync.requestItemUpdate(categoryIndex, {type, dataPath, data});
                }}>
              </hg-menu-main>
            `)}
            <hg-menu-nav
              id="nav"
              .selectedCategoryIndex=${this._selectedCategoryIndex}
              .categories=${this._displayedCategories}
              .showControls=${this._loggedIn}
              .disableControls=${disableControls}
              @request-categories-change=${async ({detail: {newCategories, newSelectedCategoryIndex, changeType, changeData}}) => {
                // todo bug when deleting last item. Remove '|| {}'
                if (changeType === HgListOldItemsChangeType.ITEM_DELETE) {
                  const deletedItem = this._displayedCategories[changeData.deletedIndex];
                  if (deletedItem.image) {
                    deleteImageInDb(deletedItem.image.name);
                  }
                }
                await this._categoriesDbSync.requestAllItemsUpdate(newCategories);
                this._selectedCategoryIndex = newSelectedCategoryIndex;
              }}
              @request-selected-category-change=${({ detail: selectedCategoryIndex}) => {
                this._selectedCategoryIndex = selectedCategoryIndex;
                scrollIntoView(this);
              }}
              @request-category-field-change=${({detail: {categoryIndex, type, dataPath, data}}) => {
                this._categoriesDbSync.requestItemUpdate(categoryIndex, {type, dataPath, data});
              }}>
            </hg-menu-nav>
          `,
        )}
      </section>
    `;
  }
}
customElements.define('hg-menu', HgMenu);
