import {html, css} from 'lit';
import {setMetaDescription} from '../../utils.js';
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
    this.shadowRoot.getElementById('hg-text').addEventListener('text-ready', (event) => setMetaDescription(event.detail));
  }
}
customElements.define('hg-intro-article', HgIntroArticle);
