import {LitElement, html, css} from 'lit-element';
import {db, updateData} from "../../utils.js";
import '../../hg-slider.js';
import '../../hg-action-buttons.js';

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
            p, .text {
              font-size: 20px;
            }
            .info {
              display: flex;
            }
            .info > * {
              display: flex;
              align-items: center;
            }
            iron-icon {
              min-width: 36px;
              height: 36px;
              filter: var(--primary-color-filter)
            }
            .text {
              min-width: 20px;
            }
            .info hg-editable-text {
              margin: 0 20px 0 10px;
            }
            .info > :last-child hg-editable-text {
              margin-right: 0;
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
            <div class="info">
              <div>
                <iron-icon src="https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fediting%2Fmove.png?alt=media&token=68fa9540-cd2c-4577-9a32-55c83d5ea682"></iron-icon>
                <hg-editable-text
                  float
                  .text=${hall.size}
                  @save=${(event) => this.updateData(`${hall.index}.size`, event.detail)}>
                  <div class="text"></div>
                </hg-editable-text> 
              </div>
              <div>
                <iron-icon src="https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fpeople%2Fcrowd.png?alt=media&token=b6252c3c-5c24-4afe-b24e-ee3159645627"></iron-icon>
                <hg-editable-text
                  float
                  .text=${hall.people}
                  @save=${(event) => this.updateData(`${hall.index}.people`, event.detail)}>
                  <div class="text"></div>
                </hg-editable-text> 
              </div> 
            </div>
            <hg-editable-text
              multiline
              .text=${hall.text}
              @save=${(event) => this.updateData(`${hall.index}.text`, event.detail)}>
              <p></p>
            </hg-editable-text>
            <hg-action-buttons .buttons=${[
              {url: '/sale', text: 'Więcej o sali'}
            ]}></hg-action-buttons>
          </article>
        `}>
      </hg-slider>
    `;
  }
});
