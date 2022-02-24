import {LitElement, html, css} from 'lit';

export class HgEventEditDate extends LitElement {
  static properties = {
    date: String,
    opened: {type: Boolean, reflect: true},
  };
  static styles = css`
    :host {
      margin-left: 8px;
    }
    paper-icon-button {
      width: 24px;
      height: 24px;
      padding: 0;
    }
    .buttons {
      margin-top: 10px;
    }
  `;
  render() {
    return html`
      <paper-icon-button 
        .icon=${'edit'}
         @click=${() => this.shadowRoot.getElementById('dialog').open()}>
      </paper-icon-button>
      <paper-dialog 
        id="dialog"
        @opened-changed=${(event) => {this.opened = event.target.opened; this.dispatchEvent(new CustomEvent('opened-changed'))}}>
        <div>
          Zmień datę wydarzenia
        </div>
        <input 
          type="date"
          name="date" 
          id="date" 
          min="${moment().format('YYYY-MM-DD')}"
          .value=${this.date}>
        <div class="buttons">
          <paper-button raised @click=${() => this.shadowRoot.getElementById('dialog').close()}>Anuluj</paper-button>   
          <paper-button raised @click=${() => {
            this.shadowRoot.getElementById('dialog').close();
            this.dispatchEvent(new CustomEvent('save', {detail: this.shadowRoot.getElementById('date').value, composed: true}));
          }}>Zapisz</paper-button>
        </div>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-event-edit-date', HgEventEditDate);
