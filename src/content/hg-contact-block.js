import {LitElement, html, css} from 'lit';
import {SendMessageRequestBodySubject} from '../../utils/sendMessage.js';
import '../content/hg-article.js';
import sharedStyles from '../styles/shared-styles';

export class HgContactBlock extends LitElement {
  static styles = sharedStyles;
  render() {
    return html`
      <h2 class="content-heading">Skontaktuj się</h2>
      <hg-article .rich=${true} .uid=${'contact-block'}></hg-article>
      <hg-contact-form .preselectedSubject=${SendMessageRequestBodySubject.GASTRO}></hg-contact-form>
    `;
  }
}
customElements.define('hg-contact-block', HgContactBlock);
