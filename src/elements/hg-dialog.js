import {LitElement, html, css} from 'lit-element';
import sharedStyles from "../styles/shared-styles";

customElements.define('hg-dialog', class extends LitElement {
  static get properties() {
    return {
      dialog: Element,
      noButtons: Boolean,
      noHeader: Boolean,
      noClose: {type: Boolean, reflect: true, attribute: 'no-close'},
    };
  }
  constructor() {
    super();
    (async () => {
      await this.updateComplete;
      this.dialog = this.shadowRoot.getElementById('dialog');
      this.dispatchEvent(new CustomEvent('dialog-changed', {detail: this.dialog}))
    })();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        --hg-dialog-header-height: 64px;
        --hg-dialog-buttons-height: 52px;
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
        padding-right: calc(64px);
      }
      .content {
        overflow: auto;
        flex: 1;
      }
      .buttons {
        border-top: solid 1px var(--divider-color);
        min-height: calc(var(--hg-dialog-buttons-height) - 16px);
      }
      paper-icon-button {
        position: absolute;
        width: 44px;
        height: 44px;
        padding: 8px;
        top: 10px;
        right: 10px;
        z-index: 1;
      }
    `];
  }
  render() {
    return html`
      <app-location @route-changed=${() => this.shadowRoot.getElementById('dialog').close()}></app-location>
      <paper-dialog
        id="dialog" 
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
        <div class="content">
          <slot name="content"></slot>
        </div>
        ${this.noButtons ? '' : html`
          <div class="buttons">
            <slot name="buttons"></slot>
          </div>
        `}
      </paper-dialog>
    `;
  }
});
