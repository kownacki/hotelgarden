import {LitElement, html, css} from 'lit';
import {createDbPath, getFromDb, updateDataOrImageInObjectInDb} from '../../utils/database.js';
import {ObjectDbSyncController} from '../../utils/ObjectDbSyncController.js';
import {ContentType} from '../../hg-app.js';
import '../hg-banner.js';

export class HgPageBanner extends LitElement {
  _objectDbSync;
  static properties = {
    path: String,
    contentType: String, // ContentType
    pageUid: String, // PageUid
    eventData: Object, // EventData | undefined
    eventDataReady: Boolean,
    defaultTitle: String,
    noBannerImage: Boolean,
    _bannerData: Object, // {image, title} | {image, heading} | undefined
    _bannerReady: Boolean,
  };
  static styles = css`
  `;
  constructor() {
    super();
    this._objectDbSync = new ObjectDbSyncController(
      this,
      async (path) => {
        if (this.contentType === ContentType.PAGE) {
          return await getFromDb(path) || {}
        } else {
          return {
            image: this.eventData.event?.image,
            title: this.defaultTitle,
          };
        }
      },
      async (objectPath, dataPath, {type, data}, oldData, object) => {
        return updateDataOrImageInObjectInDb(type, objectPath, dataPath, data, object);
      },
      (ready) => this._bannerReady = ready,
      (bannerData) => this._bannerData = bannerData,
    );
  }
  willUpdate(changedProperties) {
    if (changedProperties.has('path')) {
      if (this.contentType === ContentType.PAGE) {
        this._objectDbSync.setPath(createDbPath(`banners/${this.pageUid}`));
      } else {
        this._bannerReady = false;
      }
    }
    if (changedProperties.has('path') || changedProperties.has('eventDataReady')) {
      // Check if it's still on an event page
      if (this.contentType === ContentType.EVENT && this.eventDataReady) {
        this._objectDbSync.setPath(createDbPath('events/events', this.eventData.uid));
      }
    }
  }
  render() {
    const banner = this.contentType === ContentType.PAGE
      ? this._bannerData
      : {
        image: this._bannerData?.image,
        heading: this._bannerData?.title,
      }
    const noBannerTextsEditing = this.contentType === ContentType.PAGE
      ? this.pageUid === '404'
      : !this.eventData?.event;
    return html`
      <hg-banner
        .banner=${banner}
        .ready=${this._bannerReady}
        .noImage=${this.noBannerImage}
        .noTextsEditing=${noBannerTextsEditing}
        .noSubheading=${this.contentType === ContentType.EVENT}
        @request-image-change=${({detail: blob}) => {
          this._objectDbSync.requestFieldUpdate('image', {type: 'image', data: blob});
        }}
        @request-heading-change=${({detail: text}) => {
          const headingField = this.contentType === ContentType.PAGE ? 'heading' : 'title';
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
