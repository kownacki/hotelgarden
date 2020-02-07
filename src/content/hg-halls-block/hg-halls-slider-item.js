import {LitElement, html, css} from 'lit-element';
import {staticProp, updateData} from "../../utils.js";
import sharedStyles from "../../styles/shared-styles.js";
import ckContent from '../../styles/ck-content.js'
import '../../elements/hg-action-buttons.js';
import '../../elements/hg-icon-info.js';

const shorten = (text, maxLength) => text.length > maxLength - 3 ? text.slice(0, maxLength - 3) + '...' : text;

customElements.define('hg-halls-slider-item', class extends LitElement {
  static get properties() {
    return {
      hall: Object,
    };
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
      :host {
        padding: 0 50px;
      }
      h3 {
        margin-top: 0;
      }
      div {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      hg-icon-info {
        margin-bottom: 20px;
      }
      hg-action-buttons {
        margin-top: 30px;
      }
    `];
  }
  constructor() {
    super();
    this.classList.add('fixed-height-element');
  }
  render() {
    return html`
      <h3>${this.hall.heading}</h3>
      <hg-icon-info
        .items=${staticProp([{
          text: this.hall.size,
          src: 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
        }, {
          text: this.hall.people,
          src: 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fcrowd.png?alt=media&token=b6252c3c-5c24-4afe-b24e-ee3159645627',
        }])}>
      </hg-icon-info>
      <div class="smaller-text ck-content" 
        .innerHTML=${shorten(_.flow([_.replace(/<p>/g, ''), _.replace(/<\/p>/g, '')])(this.hall.text), 235)}>
      </div>
      <hg-action-buttons 
        .buttons=${staticProp([
          {url: `/sale-${this.hall.hallType === 'conference' ? 'konferencyjne' : 'bankietowe'}#${Number(this.hall.index) + 1}`, text: 'Więcej o sali'}
        ])}>
      </hg-action-buttons>
    `;
  }
});
