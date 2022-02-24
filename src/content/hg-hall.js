import {LitElement, html, css} from 'lit';
import {staticProp} from '../utils.js';
import sharedStyles from '../styles/shared-styles.js'
import './hg-text-image.js';
import './hg-hall/hg-hall-tables.js';

export class HgHall extends LitElement {
  static properties = {
    uid: String,
  };
  static styles = sharedStyles;
  render() {
    return html`
      <div class="divider">
        <hg-text-image
          .slider=${true}
          .uid=${this.uid}
          .iconFields=${staticProp(['size', 'people'])}
          .iconSrcs=${staticProp([
            'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
            'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fstanding-man.png?alt=media&token=f284442d-c273-480e-acd1-67a9bcb0463a'
          ])}>
        </hg-text-image>
        <hg-hall-tables .uid=${this.uid}></hg-hall-tables>
      </div>
    `;
  }
}
customElements.define('hg-hall', HgHall);
