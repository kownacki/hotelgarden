import {LitElement, html, css} from 'lit';
import {staticProp, getData, openProfitroom} from '../../utils.js';
import sharedStyles from "../../styles/shared-styles";
import ckContent from '../../styles/ck-content.js'
import '../hg-dialog.js';
import '../hg-action-button.js';
import '../hg-image.js'
import '../hg-text.js'

export class HgBookDialog extends LitElement {
  static get properties() {
    return {
      dialog: Element,
      _data: Object,
      _dataReady: Boolean,
    };
  }
  async firstUpdated() {
    this._data = await getData('texts/book');
    this._dataReady = true;
    this.dialog.notifyResize();
  }
  static get styles() {
    return [sharedStyles, ckContent, css`
      :host {
      }
      hg-dialog {
        --hg-dialog-width: 800px;
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
      <hg-dialog id="dialog" .noButtons=${true} @dialog-changed=${() => this.dialog = this.shadowRoot.getElementById('dialog').dialog}>
        <hg-text
          slot="header"
          .path=${staticProp({doc: 'texts/book', field: 'heading'})}
          .noGetText=${true}
          .text=${_.get('heading', this._data)}
          .ready=${this._dataReady}>
          <div class="bigger-text"></div>
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
                <div class="ck-content smaller-text"></div>
              </hg-text>
              <hg-action-button @click=${() => openProfitroom(location.name)}>Wybierz</hg-action-button>
            </div>
          `, [{name: 'villagarden'}, {name: 'hotelgarden'}])}     
        </div>
      </hg-dialog>
    `;
  }
}
customElements.define('hg-book-dialog', HgBookDialog);
