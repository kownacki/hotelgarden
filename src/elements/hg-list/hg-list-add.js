import {LitElement, html, css} from 'lit';

export class HgListAdd extends LitElement {
  static properties = {
    disable: Boolean,
    opened: {type: Boolean, reflect: true},
  };
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    paper-icon-button {
      background: white;
      width: 60px;
      height: 60px;
      padding: 0;
    }
  `;
  render() {
    return html`
      <paper-icon-button
        ?disabled=${this.disable}
        .icon=${'add'}
        @click=${() => this.dispatchEvent(new CustomEvent('add'))}>
      </paper-icon-button>
    `;
  }
}
customElements.define('hg-list-add', HgListAdd);
