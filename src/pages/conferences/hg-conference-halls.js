import {LitElement, html, css} from 'lit-element';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-hall.js';
import '../../content/hg-links.js';

customElements.define('hg-conference-halls', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'halls'}></hg-intro-article>
      ${_.map.convert({cap: false})((uid, index) => html`
        <hg-hall id="${index + 1}" .uid=${uid}></hg-hall>
      `, ['hall-conference-1', 'hall-conference-2', 'hall-conference-3', 'hall-conference-4'])}
    `;
  }
});
