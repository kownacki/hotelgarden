import {html, css} from 'lit-element';
import HgArticle from '../hg-article.js';

customElements.define('hg-intro-article', class extends HgArticle {
  static get properties() {
    return {};
  }
  static get styles() {
    return [super.styles, css`
      :host {
        margin: 80px auto;
      }
      /* remove it when edited */
      /* todo effect disapears when editing is on */
      p:not(:focus):first-letter {
        font-size: 3em;
        float: left;
        margin: 0.25em 0.15em 0.15em 0;
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
  }
});
