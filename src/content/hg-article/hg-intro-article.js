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
      p:not(:focus):first-letter {
        font-size: 3em;
        float: left;
        margin: 0.25em 0.15em 0.15em 0;
      }
    `];
  }
  constructor() {
    super();
  }
});
