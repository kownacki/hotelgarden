import {LitElement, html, css} from 'lit-element';
import '../../edit/hg-delete-item.js'

customElements.define('hg-content-slider-item', class extends LitElement {
  static get properties() {
    return {
      image: Object,
      noDelete: Boolean,
      _deleteOpened: {type: Boolean, reflect: true, attribute: 'delete-opened'},
    };
  }
  static get styles() {
    return css`
      :host {
        position: relative;
      }
      .container {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      iron-image {
        width: calc(100% - 1px);
        height: calc(100% - 1px);
        padding: 0.5px;
        box-sizing: border-box;
      }
      paper-icon-button {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 calc(50% - 24px);
        color: white;
        --paper-icon-button-ink-color: transparent;
      }
      .container:hover paper-icon-button {
        display: block;
      }
      hg-delete-item {
        display: none;
        position: absolute;
        top: 15px;
        right: 15px;
      }
      :host(:hover) hg-delete-item, :host([delete-opened]) hg-delete-item {
        display: block;
      }
    `;
  }
  render() {
    return html`
      <div class="container" @click=${() => this.dispatchEvent(new CustomEvent('click-image'))}>
        <iron-image .src=${_.get('url', this.image)} .sizing=${'cover'}></iron-image>
        <paper-icon-button noink .icon=${'maps:zoom-out-map'}></paper-icon-button>
      </div>
      ${this.noDelete ? '' : html`<hg-delete-item 
        .name=${_.get('name', this.image)}
        @opened-changed=${(event) => this._deleteOpened = event.target.opened}>
      </hg-delete-item>`}
    `;
  }
});
