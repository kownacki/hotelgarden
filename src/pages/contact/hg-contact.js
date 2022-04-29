import {LitElement, html, css} from 'lit';
import '../../content/hg-article.js';
import '../../content/hg-map.js';
import '../../elements/hg-contact-form.js';
import HgContent from '../../elements/hg-content.js';
import ckContent from '../../styles/ck-content.js';
import {createDbPath, getFromDb, updateInDb} from '../../utils/database.js';
import {cleanTextForMetaDescription, staticProp} from '../../utils.js';

export class HgContact extends HgContent {
  static styles = [super.styles, ckContent, css`
    hg-article {
      max-width: 1000px;
    }
    hg-contact-form {
      margin-bottom: 80px;
    }
  `];
  render() {
    return html`
      <hg-article
        class="no-animation"
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
      <hg-contact-form class="no-animation"></hg-contact-form>
      <hg-map class="no-animation"></hg-map>
    `;
  }
}
customElements.define('hg-contact', HgContact);
