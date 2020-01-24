import {LitElement, html, css} from 'lit-element';
import {staticProp, getData, detectMobile} from '../../utils.js';
import sharedStyles from "../../sharedStyles";
import '../hg-dialog.js';
import '../hg-action-button.js';
import '../hg-heading.js'
import '../hg-image.js'
import '../hg-text.js'
import moment from "moment";

customElements.define('hg-book-dialog', class extends LitElement {
  static get properties() {
    return {
      dialog: Element,
      _data: Object,
      _dataReady: Boolean,
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this._data = await getData('texts/book');
      this._dataReady = true;
      this.dialog.notifyResize();
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
      }
      hg-dialog {
        --hg-dialog-width: 800px;
      }
      h2 {
        margin: 15px 30px 15px 0 !important;
      }
      .container {
        display: flex;
        justify-content: space-between;
      }
      .container > * {  
        width: calc(50% - 10px);
      }
      h3 {
        margin: 10px 0
      }
      hg-image {
        width: 100%;
        height: 180px;
        margin-bottom: 20px;
      }
      hg-action-button {
        margin: 20px 0;
      }
      @media all and (max-width: 599px) {
        .container {
          flex-direction: column;
        }
        .container > * {
          width: auto;
        }
      }
    `];
  }
  render() {
    return html`
      <hg-dialog id="dialog" @dialog-changed=${() => this.dialog = this.shadowRoot.getElementById('dialog').dialog}>
        <hg-text
          slot="header"
          .path=${staticProp({doc: 'texts/book', field: 'heading'})}
          .noGetText=${true}
          .text=${_.get('heading', this._data)}
          .ready=${this._dataReady}>
          <h2></h2>
        </hg-text>
        <div class="container" slot="content">
          ${_.map((location) => html`
            <div>
              <hg-text
                .path=${staticProp({doc: 'texts/book', field: `${location.name}.heading`})}
                .noGetText=${true}
                .text=${_.get(`${location.name}.heading`, this._data)}
                .ready=${this._dataReady}>
                <h3></h3>
              </hg-text>
              <hg-image
                .path=${staticProp({doc: 'texts/book', field: `${location.name}.image`})}
                .noGetImage=${true}
                .image=${_.get(`${location.name}.image`, this._data)}
                .sizing=${'cover'}>
              </hg-image>
              <hg-text
                .path=${staticProp({doc: 'texts/book', field: `${location.name}.text`})}
                .rich=${true}
                .noGetText=${true}
                .text=${_.get(`${location.name}.text`, this._data)}
                .ready=${this._dataReady}>
                <div></div>
              </hg-text>
              <hg-action-button .click=${() => {
                if (detectMobile()) {
                  window.open(`https://booking.profitroom.com/pl/${location.name === 'villa' ? 'villagarden' : 'hotelgarden'}/pricelist/rooms/?check-in=${moment().format('YYYY-MM-DD')}&check-out=${moment().add(1, 'day').format('YYYY-MM-DD')}&r1_adults=2&code=&currency=PLN`, '_self');
                } else {
                  document.getElementById('wis2-chain').selectedIndex = location.profitroomId;
                  document.getElementById('wis2-open-booking').click();
                }
              }}>Wybierz</hg-action-button>
            </div>
          `, [{name: 'villa', profitroomId: 1}, {name: 'hotel', profitroomId: 2}])}     
        </div>
      </hg-dialog>
    `;
  }
});
