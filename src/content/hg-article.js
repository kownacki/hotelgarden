import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import ckContent from '../styles/ck-content.js';
import sharedStyles from '../styles/shared-styles.js';
import '../elements/hg-content-label.js';
import '../elements/hg-text.js';
import {createDbPath} from '../utils/database.js';

export default class HgArticle extends LitElement {
  static properties = {
    uid: String,
    rich: Boolean,
    richConfig: Boolean,
    classes: Object,
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
  render() {
    return html`
      <hg-text
        id="hg-text"
        .path=${createDbPath(`articles/${this.uid}`, 'text')}
        .rich=${this.rich}
        .richConfig=${this.richConfig}
        .multiline=${true}
        @text-ready=${({detail: text}) => {
          this.dispatchEvent(new CustomEvent('text-ready', {detail: text}));
        }}
        @save=${({detail: text}) => {
          this.dispatchEvent(new CustomEvent('save', {detail: text}));
        }}>
        <div id="text" class="ck-content ${this.classes ? classMap(this.classes) : ''}"></div>
      </hg-text>
      <hg-content-label .name=${'Pole tekstowe'}></hg-content-label>
    `;
  }
}
customElements.define('hg-article', HgArticle);
