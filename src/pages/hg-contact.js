import {LitElement, html, css} from 'lit';
import '../content/hg-article.js';
import '../content/hg-map.js';
import '../elements/hg-contact-form.js';
import '../elements/hg-content.js';
import ckContent from '../styles/ck-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, updateInDb} from '../utils/database.js';
import {cleanTextForMetaDescription, staticProp} from '../utils.js';

export class HgContact extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = [sharedStyles, ckContent, css`
    hg-article {
      max-width: 1000px;
      margin-bottom: 80px;
    }
    hg-contact-form {
      margin-bottom: 80px;
    }
  `];
  render() {
    return html`
      <hg-article
        .rich=${true}
        .uid=${'contact'}
        .classes=${staticProp({'smaller-text': true})}
        @text-ready=${({detail: text}) => {
          this.dispatchEvent(new CustomEvent('set-meta-description', {detail: text, composed: true}));
        }}
        @save=${({detail: text}) => {
          const cleanedText = cleanTextForMetaDescription(text);
          updateInDb(createDbPath('pages/contact', `seo.description`), cleanedText);
          this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText, composed: true}));
        }}>
      </hg-article>
      <h2 class="content-heading">Formularz kontaktowy</h2>
      <hg-contact-form></hg-contact-form>
      <hg-content>
        <hg-map class="no-animation"></hg-map>
      </hg-content>
    `;
  }
}
customElements.define('hg-contact', HgContact);
