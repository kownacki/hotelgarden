import {html, css} from 'lit-element';
import HgArticle from '../hg-article.js';
import {setMetaDescription} from "../../utils";

customElements.define('hg-intro-article', class extends HgArticle {
  static get properties() {
    return {};
  }
  static get styles() {
    return [super.styles, css`
      :host {
        margin: 80px auto;
      }
      @media all and (max-width: 599px) {
        :host {
          margin: 40px auto;
        }
      }
    `];
  }
  constructor() {
    super();
    this.richConfig = 'intro';
    this.rich = true;
    (async () => {
      await this.updateComplete;
      this.shadowRoot.getElementById('text').classList.add('big-first-letter', 'vertically-spacious-text');
      this.shadowRoot.getElementById('hg-text').addEventListener('text-ready', (event) => setMetaDescription(event.detail));
    })();
  }
});
