import {LitElement, html, css} from 'lit';
import {classMap} from 'lit/directives/class-map';
import {staticProp} from '../utils.js';
import sharedStyles from "../styles/shared-styles";
import ckContent from '../styles/ck-content.js';
import '../elements/hg-text.js';
import '../elements/hg-content-label.js';

export default class HgArticle extends LitElement {
  static get properties() {
    return {
      uid: Number,
      rich: Boolean,
      richConfig: Boolean,
      classes: Object,
    };
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
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
  }
  render() {
    return html`
      <hg-text
        id="hg-text"
        .path=${staticProp({doc: 'articles/' + this.uid, field: 'text'})}
        .rich=${this.rich}
        .richConfig=${this.richConfig}
        .multiline=${true}>
        <div id="text" class="ck-content ${this.classes ? classMap(this.classes) : ''}"></div>
      </hg-text>
      <hg-content-label .name=${'Pole tekstowe'}></hg-content-label>
    `;
  }
}
customElements.define('hg-article', HgArticle);
