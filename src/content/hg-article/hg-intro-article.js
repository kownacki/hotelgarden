import {html, css} from 'lit';
import {createDbPath, updateInDb} from '../../utils/database.js';
import {cleanTextForMetaDescription} from '../../utils.js';
import HgArticle from '../hg-article.js';

export class HgIntroArticle extends HgArticle {
  static styles = [super.styles, css`
    :host {
      margin: 80px auto;
    }
    @media all and (max-width: 599px) {
      :host {
        margin: 40px auto;
      }
    }
  `];
  constructor() {
    super();
    this.richConfig = 'intro';
    this.rich = true;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.shadowRoot.getElementById('text').classList.add('big-first-letter', 'vertically-spacious-text');
    this.addEventListener('text-ready', ({detail: text}) => {
      this.dispatchEvent(new CustomEvent('set-meta-description', {detail: text, composed: true}));
    });
    this.addEventListener('save', ({detail: text}) => {
      const cleanedText = cleanTextForMetaDescription(text);
      updateInDb(createDbPath(`pages/${this.uid}`, `seo.description`), cleanedText);
      this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText, composed: true}));
    });
  }
}
customElements.define('hg-intro-article', HgIntroArticle);
