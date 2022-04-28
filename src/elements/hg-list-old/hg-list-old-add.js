import {LitElement, html, css} from 'lit';
import '../ui/hg-icon-button.js';

export class HgListOldAdd extends LitElement {
  static properties = {
    disabled: Boolean,
  };
  static styles = css`
  `;
  render() {
    return html`
      <hg-icon-button
        .size=${'large'}
        .icon=${'add'}
        .disabled=${this.disabled}>
      </hg-icon-button>
    `;
  }
}
customElements.define('hg-list-old-add', HgListOldAdd);
