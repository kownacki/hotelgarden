import {LitElement, html, css} from 'lit';
import '@material/mwc-checkbox';
import {pagesStaticData} from '../../utils/urlStructure.js';
import '../content/hg-links.js';
import '../elements/hg-content.js';
import '../elements/hg-list-old.js';
import '../elements/hg-review.js';
import sharedStyles from '../styles/shared-styles.js';
import {
  createDbPath,
  DbPath,
  getFromDb,
  updateInObjectInDb,
} from '../utils/database.js';
import '../utils/fixes/mwc-formfield-fixed.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import {ItemsDbSyncController} from '../utils/ItemsDbSyncController.js';
import {staticProp} from '../utils.js';

const reviewBlocks = ['landing', 'restaurant', 'summer-bar', 'pizza-truck', 'weddings', 'family-parties'];

//todo implement vertical swap

const configure = {
  getIcon: () => 'settings',
  getData: (that) => {
    const checkboxes = that.shadowRoot.getElementById('dialog').querySelectorAll('mwc-checkbox');
    return reviewBlocks.filter((reviewBlock, index) => checkboxes[index].checked);
  },
  setData: (that, review) => {
    const checkboxes = that.shadowRoot.getElementById('dialog').querySelectorAll('mwc-checkbox');
    return _.zip(checkboxes, reviewBlocks).map(([checkbox, reviewBlock]) => checkbox.checked = review.display.includes(reviewBlock));
  },
  template: (that, review) => html`
    <div>
      Wyświetlaj opinię "${review.heading}" w:
    </div>
    <div>
      ${reviewBlocks.map((reviewBlock) => {
        const pageData = pagesStaticData[reviewBlock];
        return html`
          <div>
            <mwc-formfield-fixed .label=${`${pageData.path} (${pageData.name})`}>
              <mwc-checkbox></mwc-checkbox>
            </mwc-formfield-fixed>
          </div>
        `;
      })}
    </div>
  `
};

export class HgReviews extends LitElement {
  _firebaseAuth;
  _reviewsDbSync;
  static properties = {
    _path: DbPath,
    _reviews: Object,
    _reviewsReady: Boolean,
    _loggedIn: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-list-old {
      display: flex;
      flex-wrap: wrap;
      max-width: 1200px;
      padding: 40px 0;
      margin: auto;
      --columns: 3;
    }
    @media all and (max-width: 1279px) {
      hg-list-old {
        max-width: 800px;
        --columns: 2;
      }
    }
    @media all and (max-width: 839px) {
      hg-list-old {
        width: 580px;
        max-width: 100%;
        --columns: 1;
      }
    }
  `];
  constructor() {
    super();

    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });

    this._path = createDbPath('reviews/reviews');
    this._reviewsDbSync = new ItemsDbSyncController(
      this,
      {
        getItems: async (path) => await getFromDb(path) || {},
        updateItem: async (path, index, {dataPath, data}, oldItem) => {
          await updateInObjectInDb(path, `${index}.${dataPath}`, data);
          return _.set(dataPath, data, oldItem);
        },
        onDataReadyChange: (reviewsReady) => this._reviewsReady = reviewsReady,
        onDataChange: (reviews) => this._reviews = reviews,
      },
    );
    this._reviewsDbSync.setPath(this._path);
  }
  render() {
    const reviewsPageUid = 'reviews';

    return html`
      <hg-content>
        <hg-list-old
          .addAtStart=${true}
          .transform=${() => _.reverse}
          .items=${this._reviews}
          .path=${this._path}
          .showControls=${this._loggedIn}
          .getItemName=${(item) => `opinię${item.heading ? ` "${item.heading}"`: ''}`}
          .itemTemplate=${(review, index, disableEdit) => html`
            <style>
              hg-review {
                text-align: center;
                margin: 0 10px 20px;
                padding: 0 20px;
                height: 400px;
              }
              @media all and (max-width: 839px) {
                hg-review {
                  height: auto;
                  margin: 10px 0;
                  padding: 20px;
                }
              }
            </style>
            <hg-review .review=${review} .editable=${true} .disableEdit=${disableEdit}></hg-review>
          `}
          .configure=${configure}
          @request-item-configure=${({detail: {index, data}}) => {
            this._reviewsDbSync.requestItemUpdate(index, {dataPath: 'display', data});
          }}>
        </hg-list-old>
        <hg-links .pageUid=${reviewsPageUid} .excludedPages=${staticProp(['careers'])}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-reviews', HgReviews);
