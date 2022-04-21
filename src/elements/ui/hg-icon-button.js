import {LitElement, html, css} from 'lit';
import '@material/mwc-icon-button';

export class HgIconButton extends LitElement {
  static properties = {
    size: {type: String, reflect: true}, // 'compact' | 'normal' | 'large'
    icon: String,
    disabled: Boolean,
  };
  static styles = css`
    :host {
      display: inline-block;
    }
    :host([size="compact"]) mwc-icon-button {
      --mdc-icon-button-size: 24px;
    }
    :host([size="normal"]) mwc-icon-button {
      --mdc-icon-button-size: 44px;
      --mdc-icon-size: 28px;
    }
    :host([size="large"]) mwc-icon-button {
      --mdc-icon-button-size: 60px;
      --mdc-icon-size: 60px;
    }
  `;
  render() {
    return html`
      <mwc-icon-button
        .disabled=${this.disabled}
        .icon=${this.icon}>
        <slot></slot>
      </mwc-icon-button>
    `;
  }
}
customElements.define('hg-icon-button', HgIconButton);
