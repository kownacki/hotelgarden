import {LitElement, html, css} from 'lit-element';
import '../../content/hg-links.js';
import '../../content/hg-text-image.js';
import './hg-halls-tables.js';

customElements.define('hg-halls', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-article .uid=${'halls'}></hg-article>
      ${_.map((index) => html`
        <hg-text-image .uid=${'halls-' + index}></hg-text-image>
        <hg-content-slider .uid=${'halls-'+ index}></hg-content-slider>
        <hg-halls-tables .uid=${'halls-' + index}></hg-halls-tables>
      `, [1, 2, 3])}
      <hg-links .path=${'/sale'} .superpath=${'/konferencje'}></hg-links>
    `;
  }
});
