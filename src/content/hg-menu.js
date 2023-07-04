import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {throttle, range, size, mapValues, toArray, pick} from 'lodash-es';
import {
  getSelectedDoubleListIndexAfterChange,
  getSelectedIndexAfterChange,
  listItemsChangeTypeMap,
} from '../../utils/list.js';
import sharedStyles from '../styles/shared-styles.js';
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
import {addAllMenuCategory, deleteAllMenuCategory, getAllMenuCategories, scrollIntoView} from '../utils.js';
import './hg-menu/hg-menu-main.js';
import './hg-menu/hg-menu-nav.js';

const getDisplayedPageCategories = (pageCategories, allCategories) => {
  return mapValues(pageCategories, (pageCategory) => {
    return Object.values(allCategories).find((category) => category.uid === pageCategory.uid);
  });
};

const getDisplayedAllCategories = (pageCategories, allCategories) => {
  return Object.values(allCategories)
    .filter((category) => {
      return !Object.values(pageCategories).find((pageCategory) => category.uid === pageCategory.uid);
    })
    .sort((categoryA, categoryB) => {
      return (categoryA.name || '').toLowerCase() < (categoryB.name || '').toLowerCase() ? -1 : 1;
    });
};

const getPageCategories = (displayedPageCategories) => {
  return mapValues(displayedPageCategories, (displayedPageCategory) => {
    return pick(displayedPageCategory, 'uid');
  });
};

const getDoubleListIndex = (categoryIndex) => {
  return {
    index: categoryIndex.index,
    listName: categoryIndex.categoriesType === 'page' ? 'first' : 'second',
  };
};

const getSelectedCategory = (doubleListIndex) => {
  return {
    index: doubleListIndex.index,
    categoriesType: doubleListIndex.listName === 'first' ? 'page' : 'all',
  };
};

export class HgMenu extends LitElement {
  _firebaseAuth;
  _pageCategoriesDbSync;
  _allCategoriesDbSync;
  static properties = {
    // required params
    uid: String,
    menuName: String,
    // private
    _path: DbPath,
    _pageCategoriesReady: Boolean,
    _pageCategories: Object,
    _displayedPageCategories: Object,
    _allCategoriesReady: Boolean,
    _allCategories: Object,
    _displayedAllCategories: Object,
    // { index: number, categoriesType: 'page' | 'all'}
    _selectedCategory: Object,
    _compact: Boolean,
    _loggedIn: Boolean,
    _isEditingCategoryName: Boolean,
    _isEditingCategoryItemsText: Boolean,
    _isEditing: {type: Boolean, reflect: true, attribute: 'is-editing'},
    _isPageCategoriesUpdating: Boolean,
    _isAllCategoriesUpdating: Boolean,
    _isUpdating: Boolean,
  };
  static styles = [sharedStyles, css`
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
  `];
  constructor() {
    super();

    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });

    this._pageCategoriesDbSync = new ItemsDbSyncController(
      this,
      {
        getItems: async (path) => await getFromDb(path) || {},
        updateItem: async (path, index, {type, dataPath, data}, oldItem, items) => {
          // const updatedData = await updateDataOrImageInObjectInDb(type, path, `${index}.${dataPath}`, data, items);
          // return _.set(dataPath, updatedData, oldItem);
        },
        updateAllItems: async (path, data) => {
          await updateInDb(path, data);
          return data;
        },
        onDataReadyChange: (pageCategoriesReady) => {
          this._pageCategoriesReady = pageCategoriesReady;
        },
        onDataChange: (pageCategories) => {
          this._pageCategories = pageCategories;
        },
        onIsUpdatingChange: (isUpdating) => {
          this._isPageCategoriesUpdating = isUpdating;
        },
      },
    );

    this._allCategoriesDbSync = new ItemsDbSyncController(
      this,
      {
        getItems: async (path) => await getAllMenuCategories() || {},
        updateItem: async (path, index, {type, dataPath, data}, oldItem, items) => {
          const uid = oldItem.uid;
          const updatedData = await updateDataOrImageInObjectInDb(type, createDbPath(`menu/categories/categories/${uid}`), dataPath, data, oldItem);
          return _.set(dataPath, updatedData, oldItem);
        },
        updateAllItems: async (path, {newItems, newItem, deletedItem, changeType}) => {
          if (changeType === listItemsChangeTypeMap.ITEM_INSERT) {
            await addAllMenuCategory(newItem.uid);
          }
          if (changeType === listItemsChangeTypeMap.ITEM_REMOVE) {
            if (deletedItem.image) {
              await deleteImageInDb(deletedItem.image.name);
            }
            await deleteAllMenuCategory(deletedItem.uid);
          }
          return newItems;
        },
        onDataReadyChange: (allCategoriesReady) => {
          this._allCategoriesReady = allCategoriesReady;
        },
        onDataChange: (allCategories) => {
          this._allCategories = allCategories;
        },
        onIsUpdatingChange: (isUpdating) => {
          this._isAllCategoriesUpdating = isUpdating;
        },
      },
    );
    this._allCategoriesDbSync.setPath(true);

    this._compact = (window.innerWidth < 600);

    window.addEventListener('resize', throttle(
      () => this._compact = (window.innerWidth < 600),
      100,
    ));
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`menu/pages/pages/${this.uid}`)
      this._pageCategoriesDbSync.setPath(this._path);
      this._selectedCategory = {index: 0, categoriesType: 'page'};
    }
    if (changedProperties.has('_allCategories') || changedProperties.has('_pageCategories')) {
      if (this._allCategories && this._pageCategories) {
        this._displayedPageCategories = getDisplayedPageCategories(this._pageCategories, this._allCategories);
        this._displayedAllCategories = getDisplayedAllCategories(this._pageCategories, this._allCategories);
      }
    }
    if (changedProperties.has('_isEditingCategoryName') || changedProperties.has('_isEditingCategoryItemsText')) {
      this._isEditing = this._isEditingCategoryName || this._isEditingCategoryItemsText;
    }
    if (changedProperties.has('_isPageCategoriesUpdating') || changedProperties.has('_isAllCategoriesUpdating')) {
      this._isUpdating = this._isPageCategoriesUpdating || this._isAllCategoriesUpdating;
    }
  }
  async addPageCategory(allCategoryIndex) {
    const newSelectedDoubleListIndex = getSelectedDoubleListIndexAfterChange(
      getDoubleListIndex(this._selectedCategory),
      {
        first: size(this._displayedPageCategories),
        second: size(this._displayedAllCategories),
      },
      listItemsChangeTypeMap.ITEM_MOVE,
      {
        originIndex: {
          index: allCategoryIndex,
          listName: 'second',
        },
        destinationIndex: {
          index: size(this._displayedPageCategories),
          listName: 'first',
        },
      },
    );

    const newPageCategories = {
      ...this._pageCategories,
      [size(this._pageCategories)]: {
        uid: this._displayedAllCategories[allCategoryIndex].uid,
      },
    };

    await this._pageCategoriesDbSync.requestAllItemsUpdate(newPageCategories);

    this._selectedCategory = getSelectedCategory(newSelectedDoubleListIndex);
  }
  async removePageCategory(index) {
    const displayedPageCategoriesSizeBeforeChange = size(this._displayedPageCategories);
    const displayedAllCategoriesSizeBeforeChange = size(this._displayedAllCategories);

    const removedPageCategory = this._pageCategories[index];

    let newPageCategories;
    newPageCategories = toArray(this._pageCategories);
    newPageCategories.splice(index, 1);
    newPageCategories = {...newPageCategories};
    await this._pageCategoriesDbSync.requestAllItemsUpdate(newPageCategories);

    const newSelectedAllCategoriesIndex = Object.values(this._displayedAllCategories).findIndex((allCategory) => {
      return allCategory.uid === removedPageCategory.uid
    });

    const newSelectedDoubleListIndex = getSelectedDoubleListIndexAfterChange(
      getDoubleListIndex(this._selectedCategory),
      {
        first: displayedPageCategoriesSizeBeforeChange,
        second: displayedAllCategoriesSizeBeforeChange,
      },
      listItemsChangeTypeMap.ITEM_MOVE,
      {
        originIndex: {
          index,
          listName: 'first',
        },
        destinationIndex: {
          index: newSelectedAllCategoriesIndex,
          listName: 'second',
        },
      },
    );

    this._selectedCategory = getSelectedCategory(newSelectedDoubleListIndex);
  }
  async addAllCategory(newItem) {
    const newAllCategories = {...this._allCategories, [size(this._allCategories)]: newItem};
    await this._allCategoriesDbSync.requestAllItemsUpdate({
      newItems: newAllCategories,
      newItem,
      changeType: listItemsChangeTypeMap.ITEM_INSERT,
    });
    const addedCategoryIndex = Object.values(this._displayedAllCategories).findIndex((displayedAllCategory) => {
      return displayedAllCategory.uid === newItem.uid;
    })
    this._selectedCategory = {
      index: addedCategoryIndex,
      categoriesType: 'all',
    };
  }
  async deleteAllCategory(uid) {
    const deletedAllCategoriesIndex = Object.values(this._allCategories).findIndex((allCategory) => {
      return allCategory.uid === uid;
    })
    const deletedDisplayedAllCategoriesIndex = Object.values(this._displayedAllCategories).findIndex((displayedAllCategory) => {
      return displayedAllCategory.uid === uid;
    });

    const deletedAllCategory = this._allCategories[deletedAllCategoriesIndex];
    let newAllCategories;
    newAllCategories = toArray(this._allCategories);
    newAllCategories.splice(deletedAllCategoriesIndex, 1);
    newAllCategories = {...newAllCategories};

    await this._allCategoriesDbSync.requestAllItemsUpdate({
      newItems: newAllCategories,
      deletedItem: deletedAllCategory,
      changeType: listItemsChangeTypeMap.ITEM_REMOVE,
    });

    if (this._selectedCategory.categoriesType === 'all') {
      this._selectedCategory = {
        index: getSelectedIndexAfterChange(
          this._selectedCategory.index,
          size(this._displayedAllCategories),
          listItemsChangeTypeMap.ITEM_REMOVE,
          {
            removedIndex: deletedDisplayedAllCategoriesIndex,
          },
        ),
        categoriesType: 'all',
      };
    }
  }
  async changeAllCategory(uid, {type, dataPath, data}) {
    const changedIndex = Object.values(this._allCategories).findIndex((allCategory) => {
      return allCategory.uid === uid;
    })
    this._allCategoriesDbSync.requestItemUpdate(changedIndex, {type, dataPath, data});
  }
  render() {
    const showControls = this._loggedIn;
    const showAllCategories = this._loggedIn;
    const disableControls = this._isEditing || this._isUpdating;

    const currentCategoriesType = this._selectedCategory?.categoriesType;
    const currentCategories = currentCategoriesType === 'all' ? this._displayedAllCategories : this._displayedPageCategories;

    return html`
      <section>
        ${when(
          this._allCategoriesReady && this._pageCategoriesReady,
          () => html`
            ${(this._compact
              ? range(0, size(currentCategories))
              : [this._selectedCategory.index]
            ).map((categoryIndex) => html`
              <hg-menu-main
                id="main"
                .category=${currentCategories[categoryIndex] || {}}
                .categoryIndex=${categoryIndex}
                .categories=${currentCategories}
                .showControls=${showControls}
                .disableControls=${disableControls}
                @editing-category-name-changed=${({ detail: isEditingCategoryName }) => {
                  this._isEditingCategoryName = isEditingCategoryName;
                }}
                @editing-category-items-text-changed=${({ detail: isEditingCategoryItemsText }) => {
                  this._isEditingCategoryItemsText = isEditingCategoryItemsText;
                }}
                @request-category-field-change=${({detail: {type, dataPath, data}}) => {
                  const uid = currentCategories[categoryIndex].uid;
                  this.changeAllCategory(uid, {type, dataPath, data});
                }}>
              </hg-menu-main>
            `)}
            <hg-menu-nav
              id="nav"
              .selectedCategory=${this._selectedCategory}
              .pageCategories=${this._displayedPageCategories}
              .allCategories=${this._displayedAllCategories}
              .menuName=${this.menuName}
              .showAllCategories=${showAllCategories}
              .showControls=${showControls}
              .disableControls=${disableControls}
              @request-selected-category-change=${({ detail: {index, categoriesType}}) => {
                this._selectedCategory = {
                  index,
                  categoriesType,
                };
                scrollIntoView(this);
              }}
              @request-page-categories-change=${async (
                {detail: {newCategories: newDisplayedCategories, newSelectedCategoryIndex, changeType, changeData}}
              ) => {
                if (changeType === listItemsChangeTypeMap.ITEMS_SWAP) {
                  const newPageCategories = getPageCategories(newDisplayedCategories);
                  await this._pageCategoriesDbSync.requestAllItemsUpdate(newPageCategories);
                  if (newSelectedCategoryIndex >= 0) {
                    this._selectedCategory = {
                      index: newSelectedCategoryIndex,
                      categoriesType: 'page',
                    };
                  }
                }
              }}
              @request-all-categories-change=${async ({detail: {newCategories, newSelectedCategoryIndex, changeType, changeData}}) => {
                if (changeType === listItemsChangeTypeMap.ITEM_INSERT) {
                  this.addAllCategory(changeData.newItem);
                }
                if (changeType === listItemsChangeTypeMap.ITEM_REMOVE) {
                  this.deleteAllCategory(this._displayedAllCategories[changeData.deletedIndex].uid);
                }
              }}
              @request-add-page-category=${({detail: {allCategoryIndex}}) => {
                this.addPageCategory(allCategoryIndex);
              }}
              @request-remove-page-category=${({detail: {index}}) => {
                this.removePageCategory(index);
              }}>
            </hg-menu-nav>
          `,
        )}
      </section>
    `;
  }
}
customElements.define('hg-menu', HgMenu);
