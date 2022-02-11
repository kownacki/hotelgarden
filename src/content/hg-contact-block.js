import {LitElement, html, css} from 'lit';
import sharedStyles from "../styles/shared-styles";
import '../content/hg-article.js';
import '../elements/hg-contact-form.js';

customElements.define('hg-contact-block', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return [sharedStyles, css`
    `];
  }
  render() {
    return html`
      <h2 class="content-heading">Skontaktuj się</h2>
      <hg-article .rich=${true} .uid=${'contact-block'}></hg-article>
      <hg-contact-form .subject=${'gastro'}></hg-contact-form>
    `;
  }
});
