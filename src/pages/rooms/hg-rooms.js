import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../../utils.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-icons.js';
import '../../content/hg-content-slider';
import '../../elements/hg-heading.js';
// import './hg-room.js';

customElements.define('hg-rooms', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-intro-article .uid=${'rooms'}></hg-intro-article>
      <hg-icons .uid=${'rooms'}></hg-icons>
      <hg-heading h3 center>${'Wyposażenie każdego pokoju'}</hg-heading>
      <hg-icons .uid=${'rooms-facilities'}></hg-icons>
      ${_.map((index) => html`
        <hg-text-image
          .uid=${'rooms-' + index}
          .iconFields=${staticProp(['size', 'people'])}
          .iconSrcs=${staticProp([
            'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
            'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fstanding-man.png?alt=media&token=f284442d-c273-480e-acd1-67a9bcb0463a'
          ])}
          .buttons=${staticProp([{url: '#', text: 'Rezerwuj pokój'}])}>
        </hg-text-image>
        ${index === 1 || index === 4 ? '' : html`
          <hg-heading h3 center>${'Dodatkowe udogodnienia pokoju'}</hg-heading>
          <hg-icons .uid=${'rooms-'+ index}></hg-icons>
        `}
        <hg-content-slider .uid=${'rooms-'+ index}></hg-content-slider>
      `, [1, 2, 3, 4])}
      <hg-heading center>${'Warunki rezerwacji'}</hg-heading>
      <hg-icons .uid=${'rooms-conditions'}></hg-icons>
    `;
  }
});
