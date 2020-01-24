import {LitElement, html, css} from 'lit-element';
import sharedStyles from "../sharedStyles";

customElements.define('hg-dialog', class extends LitElement {
  static get properties() {
    return {
      dialog: Element,
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
      }
      .content {
        overflow: auto;
        flex: 1;
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
      <paper-dialog
        id="dialog" 
        @opened-changed=${(event) => {
          document.body.style.overflow = event.target.opened ? 'hidden' : null;
          if (event.target.opened) {
            window.history.pushState(null, document.title, '#dialog');
            this._eventToRemove = () => this.dialog.close();
            window.addEventListener('popstate', this._eventToRemove);
          } else {
            window.removeEventListener('popstate', this._eventToRemove);
          }
        }}>
        <header>
          <paper-icon-button 
            .icon=${'close'} 
            @click=${() => {
              window.history.back();
              this.dialog.close();
            }}>
          </paper-icon-button>
          <slot name="header"></slot>
        </header>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </paper-dialog>
    `;
  }
});