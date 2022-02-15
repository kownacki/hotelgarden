import {LitElement, html, css} from 'lit';
import sharedStyles from "../styles/shared-styles";

export class HgDialog extends LitElement {
  static get properties() {
    return {
      noButtons: Boolean,
      fixedButtons: {type: Boolean, reflect: true, attribute: 'fixed-buttons'},
      noHeader: Boolean,
      noClose: {type: Boolean, reflect: true, attribute: 'no-close'},
      modal: Boolean,
      //
      dialog: Element,
      scrollable: Element,
    };
  }
  firstUpdated() {
    this.dialog = this.shadowRoot.getElementById('dialog');
    this.scrollable = this.shadowRoot.getElementById(this.fixedButtons ? 'content' : 'content-and-buttons');
    this.dispatchEvent(new CustomEvent('dialog-changed', {detail: this.dialog}))
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        display: block;
        position: relative;
      }
      paper-dialog {
        width: var(--hg-dialog-width);
        display: flex;
        flex-direction: column;
        font-size: 18px;
        margin: 10px;
      }
      paper-dialog > * {
        margin: 0;
      }
      header {
        border-bottom: solid 1px var(--divider-color);
        line-height: 1.5em;
        padding: 15px 24px;
      }
      :host(:not([no-close])) header {
        padding: 15px 64px 15px 24px;
      }
      .content-and-buttons {
        padding: 0;
        overflow: auto;
        flex: 1;
      }
      .content {
        padding: 0 24px;
      }
      :host([fixed-buttons]) .content-and-buttons {
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      :host([fixed-buttons]) .content {
        overflow: auto;
        flex: 1;
      }
      .buttons {
        padding: 2px 4px 2px 12px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap: wrap;
      }
      :host([fixed-buttons]) .buttons {
        border-top: solid 1px var(--divider-color);
      }
      :host(:not([fixed-buttons])) .buttons {
        padding: 2px 24px 12px 24px;
      }
      ::slotted([slot="button"]) {
        margin: 6px 4px;
      }
      paper-icon-button {
        position: absolute;
        width: 44px;
        height: 44px;
        padding: 8px;
        top: 8px;
        right: 8px;
        z-index: 1;
      }
      @media all and (max-width: 839px) {
        paper-dialog {
          margin: 0;
          width: 100%;
          height: 100%;
        }
        :host(:not([no-close])) header {
          padding: 15px 24px 15px 64px;
        }
        paper-icon-button {
          left: 8px;
          right: auto;
        }
      }
    `];
  }
  render() {
    return html`
      <app-location @route-changed=${() => this.shadowRoot.getElementById('dialog').close()}></app-location>
      <paper-dialog
        id="dialog" 
        .modal=${this.modal}
        @opened-changed=${(event) => {
          this.dispatchEvent(new CustomEvent('hg-dialog-opened-changed', {detail: event.detail.value, composed: true, bubbles: true}));
          document.body.style.overflow = event.target.opened ? 'hidden' : null;
          if (event.target.opened) {
            this._locationOnOpen = window.location.pathname;
            window.history.pushState(null, document.title, '#dialog');
            this._eventToRemove = () => this.dialog.close();
            window.addEventListener('popstate', this._eventToRemove);
          } else {
            if (!this._locationOnOpen && window.location.hash === '#dialog') {
              window.history.back();
            }
            if (this._locationOnOpen) {
              window.removeEventListener('popstate', this._eventToRemove);
              if (this._locationOnOpen === window.location.pathname && window.location.hash === '#dialog') {
                window.history.back();
              }
            }
          }
        }}>
        ${this.noClose ? '' : html`
          <paper-icon-button 
            .icon=${'close'} 
            @click=${() => this.dialog.close()}>
          </paper-icon-button>
        `}
        ${this.noHeader ? '' : html`
          <header class="bigger-text">
            <slot name="header"></slot>
          </header>
        `}
        <div class="content-and-buttons" id="content-and-buttons">
          <div class="content" id="content">
            <slot name="content"></slot>
          </div>
          ${this.noButtons ? '' : html`
            <div class="buttons">
              <slot name="button"></slot>
            </div>
          `}
        </div>
      </paper-dialog>
    `;
  }
}
customElements.define('hg-dialog', HgDialog);
