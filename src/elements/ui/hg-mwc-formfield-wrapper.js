import {LitElement, html, css} from 'lit';

/*
  Works with mwc-radio only
 */
export class HgMwcFormfieldWrapper extends LitElement {
  static properties = {
    invalid: {type: Boolean, reflect: true},
  };
  static styles = css`
    :host([invalid]) ::slotted(*) {
      color: var(--error-color);
      --mdc-radio-unchecked-color: var(--error-color);
      --mdc-theme-text-primary-on-background: var(--error-color);
    }
  `;
  render() {
    return html`
      <slot></slot>
    `;
  }
}
customElements.define('hg-mwc-formfield-wrapper', HgMwcFormfieldWrapper);
