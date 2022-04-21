import {LitElement, html, css} from 'lit';
import '../ui/hg-icon-button.js';

export class HgListItemSwap extends LitElement {
  static properties = {
    vertical: {type: Boolean, reflect: true},
    disabled: Boolean,
  };
  static styles = css`
    :host {
      background: white;
    }
  `;
  render() {
    return html`
      <hg-icon-button
        .size=${'compact'}
        .icon=${this.vertical ? 'swap_vert' : 'swap_horiz'}
        .disabled=${this.disabled}>
      </hg-icon-button>
    `;
  }
}
customElements.define('hg-list-item-swap', HgListItemSwap);
