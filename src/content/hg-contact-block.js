import {LitElement, html, css} from 'lit-element';
import '../elements/hg-contact-form.js';

customElements.define('hg-contact-block', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-heading center>${'Skontaktuj się'}</hg-heading>
      <hg-article .rich=${true} .uid=${'contact-block'}></hg-article>
      <hg-contact-form .subject=${'gastro'}></hg-contact-form>
    `;
  }
});
