import {LitElement, html, css} from 'lit-element';
import {db} from "../../utils";
import '../../content/hg-article.js';
import '../../elements/hg-contact-form.js';

customElements.define('hg-contact', class extends LitElement {
  static get properties() {
    return {};
  }
  constructor() {
    super();
    (async () => {
      this._events = (await db.doc('events/events').get()).data() || {};
    })();
  }
  static get styles() {
    return css`
      hg-article {
        max-width: 1000px;
      }
    `;
  }
  render() {
    return html`
      <hg-article .rich=${true} .uid=${'contact'}></hg-article>
      <hg-contact-form></hg-contact-form>
    `;
  }
});
