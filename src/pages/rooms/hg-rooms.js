import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../styles/shared-styles.js'
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-content-icons.js';
import '../../elements/hg-heading.js';
import './hg-room.js';

customElements.define('hg-rooms', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return [sharedStyles, css`
    `];
  }
  render() {
    return html`
      <hg-intro-article .uid=${'rooms'}></hg-intro-article>
      <hg-content-icons .uid=${'rooms'}></hg-content-icons>
      ${_.map((index) => html`
        <hg-room .index=${index}></hg-room>
      `, [1, 2, 3, 4])}
      <hg-heading center>${'Warunki rezerwacji'}</hg-heading>
      <hg-content-icons .uid=${'rooms-conditions'}></hg-content-icons>
    `;
  }
});
