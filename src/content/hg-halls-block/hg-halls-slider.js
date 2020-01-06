import {LitElement, html, css} from 'lit-element';
import {db, updateData} from "../../utils.js";
import '../../edit/hg-editable-text.js'
import '../../elements/hg-slider.js';
import '../../elements/hg-action-buttons.js';
import '../../elements/hg-icon-info.js';

customElements.define('hg-halls-slider', class extends LitElement {
  static get properties() {
    return {
      uid: String,
      _hallsBlock: Array,
    };
  }
  static get styles() {
    return css`
      hg-slider {
        margin: 60px 0;
        height: 100%;
      }
    `;
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._hallsBlock = _.map.convert({cap: false})(
        (hall, index) => ({index, ...hall}),
        (await db.doc('hallsBlocks/' + this.uid).get()).data(),
      ) || {};
    })();
  }
  async updateData(path, data) {
    updateData('hallsBlocks/' + this.uid, path, data);
  }
  render() {
    return html`
      <hg-slider
        .items=${this._hallsBlock}
        .template=${(hall) => html`
          <style>
            article {
              padding: 0 60px;
            }
            article > hg-editable-text {
              flex: 1;
            }
            p {
              line-height: 1.4em;
              font-size: 20px;
            }
            hg-action-buttons {
              margin-top: 40px;
            }
          </style>
          <article>
            <hg-editable-text
              .text=${hall.name}
              @save=${(event) => this.updateData(`${hall.index}.name`, event.detail)}>
              <hg-heading h3></hg-heading>
            </hg-editable-text>
            <hg-icon-info
              .items=${[{
                text: hall.size,
                src: 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682',
              }, {
                text: hall.people,
                src: 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fcrowd.png?alt=media&token=b6252c3c-5c24-4afe-b24e-ee3159645627',
              }]}
              @save=${(event) => this.updateData(`${hall.index}.${['size', 'people'][event.detail.index]}`, event.detail.text)}>
            </hg-icon-info>
            <hg-editable-text
              multiline
              .text=${hall.text}
              @save=${(event) => this.updateData(`${hall.index}.text`, event.detail)}>
              <p></p>
            </hg-editable-text>
            <hg-action-buttons .buttons=${[
              {url: '/sale#' + (Number(hall.index) + 1), text: 'Więcej o sali'}
            ]}></hg-action-buttons>
          </article>
        `}>
      </hg-slider>
    `;
  }
});
