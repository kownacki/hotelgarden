import {LitElement, html, css} from 'lit';
import '../ui/hg-icon-button.js';

export class HgSliderMove extends LitElement {
  static properties = {
    direction: Boolean, // 'left | 'right'
    disabled: Boolean,
  };
  static styles = css`
    :host {
    }
  `;
  render() {
    return html`
      <hg-icon-button
        .size=${'normal'}
        .icon=${this.direction === 'left' ? 'chevron_left' : 'chevron_right'}
        .disabled=${this.disabled}>
      </hg-icon-button>
    `;
  }
}
customElements.define('hg-slider-move', HgSliderMove);
