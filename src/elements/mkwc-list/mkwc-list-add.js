import {LitElement, html, css} from 'lit';

export class MkwcListAdd extends LitElement {
  static properties = {
  };
  static styles = css`
  `;
  render() {
    return html`
      <slot></slot>
    `;
  }
}
customElements.define('mkwc-list-add', MkwcListAdd);
