import {LitElement, html, css} from 'lit';
import {SendMessageRequestBodySubject} from '../../utils/sendMessage.js';
import '../content/hg-article.js';
import '../content/hg-content-slider.js';
import '../elements/hg-contact-form.js';
import ckContent from '../styles/ck-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {createDbPath, updateInDb} from '../utils/database.js';
import {cleanTextForMetaDescription, staticProp} from '../utils.js';

export class HgCareers extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = [sharedStyles, ckContent, css`
    hg-article {
      max-width: 850px;
      margin-bottom: 80px;
    }
    hg-contact-form {
      margin-bottom: 80px;
    }
  `];
  render() {
    const careersUid = 'careers';

    return html`
      <hg-article
        .rich=${true}
        .uid=${careersUid}
        .classes=${staticProp({'smaller-text': true})}
        @text-ready=${({detail: text}) => {
          this.dispatchEvent(new CustomEvent('set-meta-description', {detail: text, composed: true}));
        }}
        @save=${({detail: text}) => {
          const cleanedText = cleanTextForMetaDescription(text);
          updateInDb(createDbPath(`pages/${careersUid}`, `seo.description`), cleanedText);
          this.dispatchEvent(new CustomEvent('set-meta-description', {detail: cleanedText, composed: true}));
        }}>
      </hg-article>
      <h2 class="content-heading">Formularz kontaktowy</h2>
      <hg-contact-form .preselectedSubject=${SendMessageRequestBodySubject.CAREERS}></hg-contact-form>
      <hg-content-slider .uid=${careersUid}></hg-content-slider>
    `;
  }
}
customElements.define('hg-careers', HgCareers);
