import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../styles/shared-styles.js'
import './hg-text-image.js';
import './hg-hall/hg-hall-tables.js';

customElements.define('hg-hall', class extends LitElement {
  static get properties() {
    return {
      uid: String,
    };
  }
  static get styles() {
    return [sharedStyles, css`
    `];
  }
  render() {
    return html`
      <div class="divider">
        <hg-text-image .uid=${this.uid}></hg-text-image>
        <hg-hall-tables .uid=${this.uid}></hg-hall-tables>
      </div>
    `;
  // <!--<hg-halls-tables .uid=${'halls-' + index}></hg-halls-tables>
  //   <hg-text-image id="${index}" .uid=${'halls-' + index}></hg-text-image>
  //   <hg-content-slider .uid=${'halls-'+ index}></hg-content-slider>
  //   <hg-halls-tables .uid=${'halls-' + index}></hg-halls-tables>-->
  }
});
