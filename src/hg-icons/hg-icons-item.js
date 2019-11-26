import {LitElement, html, css} from 'lit-element';

customElements.define('hg-icons-item', class extends LitElement {
  static get properties() {
    return {
      icon: Object,
      last: Boolean,
      disableEdit: Boolean,
    };
  }
  static get styles() {
    return css`
      :host {
        width: 130px;
        margin: 10px;
        position: relative;
      }
      iron-icon {
        display: block;
        margin: auto;
        width: 60px;
        height: 60px;
        filter: var(--primary-color-filter)
      }
      p {
        text-align: center;
      }
      .edit {
        position: absolute;
        right: 0;
        top: 10px;
        display: flex;
        flex-direction: column;
      }
      paper-icon-button {
        width: 24px;
        height: 24px;
        padding: 0;
      }
    `;
  }
  render() {
    return html`
      <iron-icon .src="${this.icon.url}"></iron-icon>
      <p>${this.icon.text}</p>
      <div class="edit">
        <hg-delete-item .disable=${this.disableEdit} .name=${"ikona"}></hg-delete-item>
        ${this.last ? '' : html`<paper-icon-button
          icon="swap-horiz"
          ?disabled=${this.disableEdit}
          @click=${() => this.dispatchEvent(new CustomEvent('request-swap'))}>
        </paper-icon-button>`}
      </div>
    `;
  }
});
