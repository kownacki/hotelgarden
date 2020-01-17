import {LitElement, html, css} from 'lit-element';
import {staticProp} from "../../utils.js";
import sharedStyles from "../../sharedStyles.js";
import '../../elements/hg-action-buttons.js';
import '../../elements/hg-icon-info.js';

customElements.define('hg-halls-slider-item', class extends LitElement {
  static get properties() {
    return {
      hall: Object,
      dataReady: Boolean,
    };
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        padding: 0 60px;
      }
      :host > hg-editable-text {
        flex: 1;
      }
      hg-action-buttons {
        margin-top: 40px;
      }
      @media all and (max-width: 479px) {
        p {
          font-size: 16px;
        }
      }
    `];
  }
  render() {
    return html`
      <hg-editable-text
        .ready=${this.dataReady}
        .text=${this.hall.name}
        @save=${(event) => this.updateData(`${this.hall.index}.name`, event.detail)}>
        <hg-heading h3></hg-heading>
      </hg-editable-text>
      <hg-icon-info
        .dataReady=${this.dataReady}
        .items=${staticProp([{
          text: this.hall.size,
          src: 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
        }, {
          text: this.hall.people,
          src: 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fcrowd.png?alt=media&token=b6252c3c-5c24-4afe-b24e-ee3159645627',
        }])}
        @save=${(event) => this.updateData(`${this.hall.index}.${['size', 'people'][event.detail.index]}`, event.detail.text)}>
      </hg-icon-info>
      <hg-editable-text
        float
        .ready=${this.dataReady}
        multiline
        .text=${this.hall.text}
        @save=${(event) => this.updateData(`${this.hall.index}.text`, event.detail)}>
        <p></p>
      </hg-editable-text>
      <hg-action-buttons 
        .buttons=${staticProp([
          {url: '/sale#' + (Number(this.hall.index) + 1), text: 'Więcej o sali'}
        ])}>
      </hg-action-buttons>
    `;
  }
});
