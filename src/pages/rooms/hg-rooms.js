import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import sharedStyles from '../../styles/shared-styles.js'
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-content-icons.js';
import '../../elements/hg-icons.js';
import '../../elements/hg-heading.js';
// import './hg-room.js';

customElements.define('hg-rooms', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return [sharedStyles, css`
      .room hg-text-image {
        margin-bottom: 40px;
      }
      .room hg-content-icons {
        margin-top: 40px;
      }
    `];
  }
  render() {
    return html`
      <hg-intro-article .uid=${'rooms'}></hg-intro-article>
      <hg-content-icons .uid=${'rooms'}></hg-content-icons>
      ${_.map((index) => html`
        <div class="room divider">
          <hg-text-image
            .uid=${'rooms-' + index}
            .iconFields=${staticProp(['size', 'people'])}
            .iconSrcs=${staticProp([
              'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
              'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fstanding-man.png?alt=media&token=f284442d-c273-480e-acd1-67a9bcb0463a'
            ])}
            .icons=${true}
            .buttons=${staticProp([{url: '#', text: 'Rezerwuj pokój'}])}>
          </hg-text-image>
          <hg-content-icons .small=${true} .uid=${'rooms-' + index}></hg-content-icons>
        </div>
      `, [1, 2, 3, 4])}
      <hg-heading center>${'Warunki rezerwacji'}</hg-heading>
      <hg-content-icons .uid=${'rooms-conditions'}></hg-content-icons>
    `;
  }
});
