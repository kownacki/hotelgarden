import {LitElement, html, css} from 'lit';
import {staticProp, setMetaDescription} from "../../utils";
import ckContent from "../../styles/ck-content.js";
import HgContent from '../../elements/hg-content.js';
import '../../content/hg-article.js';
import '../../elements/hg-contact-form.js';
import '../../content/hg-map.js';

export class HgContact extends HgContent {
  static styles = [super.styles, ckContent, css`
    hg-article {
      max-width: 1000px;
    }
  `];
  constructor() {
    super();
    (async () => {
      this._events = (await db.doc('events/events').get()).data() || {};
    })();
  }
  render() {
    return html`
      <hg-article
        class="no-animation"
        .rich=${true} 
        .uid=${'contact'} 
        .classes=${staticProp({'smaller-text': true})}
        @text-ready=${(event) => setMetaDescription(event.detail)}>
      </hg-article>
      <hg-contact-form class="no-animation"></hg-contact-form>
      <hg-map class="no-animation"></hg-map>
    `;
  }
}
customElements.define('hg-contact', HgContact);
