import {LitElement, html, css} from 'lit';
import {createDbPath, getFromDb, updateDataOrImageInObjectInDb} from '../../utils/database.js';
import {ObjectDbSyncController} from '../../utils/ObjectDbSyncController.js';
import {PageType} from '../../hg-app.js';
import '../hg-banner.js';

export class HgPageBanner extends LitElement {
  _objectDbSync;
  static properties = {
    path: String,
    pageType: String, // PageType
    pageUid: String, // PageUid
    dynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    dynamicPathPageReady: Boolean,
    defaultTitle: String,
    noBannerImage: Boolean,
    initialPage: Boolean,
    _bannerData: Object, // {image, title} | {image, heading} | undefined
    _bannerReady: Boolean,
  };
  static styles = css`
  `;
  constructor() {
    super();
    this._objectDbSync = new ObjectDbSyncController(
      this,
      {
        getObject: async (path) => {
          if (this.pageType === PageType.STATIC_PATH) {
            return (this.initialPage ? window.initialData.banner : await getFromDb(path)) || {};
          } else {
            return {
              image: this.dynamicPathPage?.image,
              title: this.defaultTitle,
            };
          }
        },
        updateField: async (objectPath, dataPath, {type, data}, oldData, object) => {
          return updateDataOrImageInObjectInDb(type, objectPath, dataPath, data, object);
        },
        onDataReadyChange: (ready) => this._bannerReady = ready,
        onDataChange: (bannerData) => this._bannerData = bannerData,
      },
    );
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.pageType === PageType.STATIC_PATH) {
        this._objectDbSync.setPath(createDbPath(`banners/${this.pageUid}`));
      } else {
        this._bannerReady = false;
      }
    }
    if (changedProperties.has('path') || changedProperties.has('dynamicPathPageReady')) {
      // Check if it's still on dynamic path page
      if (this.pageType === PageType.DYNAMIC_PATH && this.dynamicPathPageReady) {
        this._objectDbSync.setPath(createDbPath(`dynamicPathPages/${this.dynamicPathPage?.uid}`));
      }
    }
  }
  render() {
    const banner = this.pageType === PageType.STATIC_PATH
      ? this._bannerData
      : {
        image: this._bannerData?.image,
        heading: this._bannerData?.title,
      }
    const noBannerTextsEditing = this.pageType === PageType.STATIC_PATH
      ? this.pageUid === '404'
      : !this.dynamicPathPage;
    return html`
      <hg-banner
        .banner=${banner}
        .ready=${this._bannerReady}
        .noImage=${this.noBannerImage}
        .noTextsEditing=${noBannerTextsEditing}
        .noSubheading=${this.pageType === PageType.DYNAMIC_PATH}
        @request-image-change=${({detail: blob}) => {
          this._objectDbSync.requestFieldUpdate('image', {type: 'image', data: blob});
        }}
        @request-heading-change=${({detail: text}) => {
          const headingField = this.pageType === PageType.STATIC_PATH ? 'heading' : 'title';
          this._objectDbSync.requestFieldUpdate(headingField, {type: 'data', data: text});
        }}
        @request-subheading-change=${({detail: text}) => {
          this._objectDbSync.requestFieldUpdate('subheading', {type: 'data', data: text});
        }}>
      </hg-banner>
    `;
  }
}
customElements.define('hg-page-banner', HgPageBanner);
