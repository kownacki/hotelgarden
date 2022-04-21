import {LitElement, html, css} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import './hg-dialog/hg-dialog-close.js';

export class HgDialog extends LitElement {
  static properties = {
    noButtons: Boolean,
    fixedButtons: {type: Boolean, reflect: true, attribute: 'fixed-buttons'},
    noHeader: Boolean,
    noClose: {type: Boolean, reflect: true, attribute: 'no-close'},
    modal: Boolean,
    //
    dialog: Element,
    scrollable: Element,
  };
  static styles = [sharedStyles, css`
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
    hg-dialog-close  {
      position: absolute;
      padding: 0;
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
      hg-dialog-close {
        left: 8px;
        right: auto;
      }
    }
  `];
  firstUpdated() {
    this.dialog = this.shadowRoot.getElementById('dialog');
    this.scrollable = this.shadowRoot.getElementById(this.fixedButtons ? 'content' : 'content-and-buttons');
    this.dispatchEvent(new CustomEvent('dialog-changed', {detail: this.dialog}))
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
          <hg-dialog-close
            @click=${() => this.dialog.close()}>
          </hg-dialog-close>
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
