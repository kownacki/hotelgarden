import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import '../edit/hg-editable-text.js';
import '../elements/hg-content-label.js';
import ckContent from '../styles/ck-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, getFromDb, updateInObjectInDb} from '../utils/database.js';
import {ObjectDbSyncController} from '../utils/ObjectDbSyncController.js';

export default class HgArticle extends LitElement {
  _articleDbSync;
  static properties = {
    uid: String,
    rich: Boolean,
    richConfig: Boolean,
    classes: Object,
    predefinedArticle: Object,
    _article: Object,
    _articleReady: Boolean,
  };
  static styles = [sharedStyles, ckContent, css`
    :host {
      position: relative;
      display: block;
      margin: 40px auto;
      max-width: 700px;
      padding: 0 20px;
    }
    :host(:hover) hg-content-label {
      left: 20px;
      display: block;
    }
  `];
  constructor() {
    super();
    this._articleDbSync = new ObjectDbSyncController(
      this,
      {
        getObject: async (path) => {
          return (this.predefinedArticle || await getFromDb(path)) || {};
        },
        updateField: async (objectPath, dataPath, data) => {
          await updateInObjectInDb(objectPath, dataPath, data);
          return data;
        },
        onDataReadyChange: (ready) => this._articleReady = ready,
        onDataChange: (article) => this._article = article,
      },
    );
  }
  async willUpdate(changedProperties) {
    if (changedProperties.has('uid')) {
      this._path = createDbPath(`articles/${this.uid}`);
      this._articleDbSync.setPath(this._path);
    }
    if (changedProperties.has('_articleReady') && this._articleReady) {
      this.dispatchEvent(new CustomEvent('text-ready', {detail: this._article.text}));
    }
  }
  render() {
    return html`
      <hg-editable-text
        .ready=${this._articleReady}
        .text=${this._article?.text}
        .rich=${this.rich}
        .richConfig=${this.richConfig}
        .multiline=${true}
        @save=${({detail: text}) => {
          this._articleDbSync.requestFieldUpdate('text', text);
          this.dispatchEvent(new CustomEvent('save', {detail: text}));
        }}
      >
        <div id="text" class="ck-content ${this.classes ? classMap(this.classes) : ''}"></div>
      </hg-editable-text>
      <hg-content-label .name=${'Pole tekstowe'}></hg-content-label>
    `;
  }
}
customElements.define('hg-article', HgArticle);
