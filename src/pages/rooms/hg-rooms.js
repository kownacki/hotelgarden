import {LitElement, html, css} from 'lit-element';
import {staticProp, ROOM_ID, openProfitroom} from '../../utils.js';
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
      ${_.map.convert({cap: false})((rooms, index) => html`
        <div class="room divider">
          <hg-text-image
            .uid=${'rooms-' + (index + 1)}
            .iconFields=${staticProp(['size', 'people'])}
            .iconSrcs=${staticProp([
              'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
              'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fstanding-man.png?alt=media&token=f284442d-c273-480e-acd1-67a9bcb0463a'
            ])}
            .icons=${true}
            .buttons=${_.map(
              (room) => ({click: () => openProfitroom(room.location, room.id, room.adults), text: room.text || 'Rezerwuj pokój'}),
            rooms)}>
          </hg-text-image>
          <hg-content-icons .small=${true} .uid=${'rooms-' + (index + 1)}></hg-content-icons>
        </div>
      `, [
        [
          {location: 'hotelgarden', id: ROOM_ID.doubleClassic, text: 'Rezerwuj pokój (łóżka razem)'}, 
          {location: 'hotelgarden', id: ROOM_ID.twin, text: 'Rezerwuj pokój (łóżka osobno)'}
        ],
        [{location: 'hotelgarden', id: ROOM_ID.superior}],
        [{location: 'villagarden', id: ROOM_ID.villaRoom}],
        [
          {location: 'hotelgarden', id: ROOM_ID.tripleClassic, adults: 3, text: 'Rezerwuj pokój (3 osoby)'},
          {location: 'hotelgarden', id: ROOM_ID.quadClassic, adults: 4, text: 'Rezerwuj pokój (4 osoby)'}
        ],
      ])}
      <hg-heading center>${'Warunki rezerwacji'}</hg-heading>
      <hg-content-icons .uid=${'rooms-conditions'}></hg-content-icons>
    `;
  }
});
