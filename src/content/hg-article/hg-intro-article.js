import {html, css, LitElement} from 'lit';
import sharedStyles from '../../styles/shared-styles.js';
import {createDbPath, updateInDb} from '../../utils/database.js';
import {cleanTextForMetaDescription, staticProp} from '../../utils.js';
import '../hg-article.js';

export class HgIntroArticle extends LitElement {
  static properties = {
    uid: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      margin: 80px auto;
    }
    @media all and (max-width: 599px) {
      :host {
        margin: 40px auto;
      }
    }
  `];
  render() {
    return html`
      <div class="container">
        <hg-article
          .uid=${this.uid}
          .richConfig="intro"
          .rich=${true}
          .classes=${staticProp({
            'big-first-letter': true,
            'vertically-spacious-text': true,
          })}
          @text-ready=${({detail: text}) => {
            this.dispatchEvent(new CustomEvent('set-meta-description', {detail: text, composed: true}));
          }}
          @save=${({detail: text}) => {
            const cleanedText = cleanTextForMetaDescription(text);
            updateInDb(createDbPath(`pages/${this.uid}`, `seo.description`), cleanedText);
            this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText, composed: true}));
          }}
        ></hg-article>
      </div>
    `;
  }
}
customElements.define('hg-intro-article', HgIntroArticle);
