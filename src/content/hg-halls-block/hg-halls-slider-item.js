import {LitElement, html, css} from 'lit-element';
import {staticProp, updateData} from "../../utils.js";
import sharedStyles from "../../sharedStyles.js";
import '../../elements/hg-action-buttons.js';
import '../../elements/hg-icon-info.js';

customElements.define('hg-halls-slider-item', class extends LitElement {
  static get properties() {
    return {
      uid: String,
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
      h3 {
        margin-top: 0;
      }
      div {
        margin-top: 20px;
      }
      hg-icon-info {
        margin-bottom: 20px;
      }
      hg-action-buttons {
        margin-top: 30px;
      }
    `];
  }
  async updateData(path, data) {
    updateData('hallsBlocks/' + this.uid, path, data);
  }
  render() {
    return html`
      <hg-editable-text
        .ready=${this.dataReady}
        .text=${this.hall.name}
        @save=${(event) => this.updateData(`${this.hall.index}.name`, event.detail)}>
        <h3></h3>
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
        class="text"
        float
        .ready=${this.dataReady}
        .rich=${true}
        .richConfig=${'intro'}
        multiline
        .text=${this.hall.text}
        @save=${(event) => this.updateData(`${this.hall.index}.text`, event.detail)}>
        <div class="smaller-text"></div>
      </hg-editable-text>
      <hg-action-buttons 
        .buttons=${staticProp([
          {url: '/sale#' + (Number(this.hall.index) + 1), text: 'Więcej o sali'}
        ])}>
      </hg-action-buttons>
    `;
  }
});
