import {LitElement, html, css} from 'lit';
import '../ui/hg-icon-button.js';

export class HgDialogClose extends LitElement {
  static properties = {
  };
  static styles = css`
    display: inline-block;
  `;
  render() {
    return html`
      <hg-icon-button
        .size=${'normal'}
        .icon=${'close'}>
      </hg-icon-button>
    `;
  }
}
customElements.define('hg-dialog-close', HgDialogClose);
