import {LitElement, css, html} from 'lit';
import sharedStyles from '../styles/shared-styles.js';
import {checkElementsVisibility} from '../utils.js';

export default class HgContent extends LitElement {
  static styles = [sharedStyles, css`
    /* Prevent bugs. Iphone adds style tag as host's last child. */
    ::slotted(:not(style):not(.no-animation)) {
      transition-property: opacity, top;
      transition-duration: 0.5s;
      transition-timing-function: ease-in-out;
      top: 30px;
      opacity: 0;
      position: relative;
    }
    ::slotted(.seen:not(.no-animation)) {
      opacity: 1;
      top: 0;
    }
  `];
  firstUpdated() {
    this._checkChildrenVisibility = () => {
      const children = this.shadowRoot.children[0].assignedElements();
      checkElementsVisibility(children);
    };
    this._checkChildrenVisibility();
    addEventListener('DOMContentLoaded', this._checkChildrenVisibility);
    addEventListener('load', this._checkChildrenVisibility);
    addEventListener('scroll', this._checkChildrenVisibility);
    addEventListener('resize', this._checkChildrenVisibility);
    addEventListener('touchmove', this._checkChildrenVisibility);
    // todo is this event listener required to be removed?
    this.addEventListener('check-visibility', (event) => {
      this._checkChildrenVisibility();
      event.stopPropagation();
    });
    // todo heuristics to catch any not showing content when some movement happens
    setTimeout(this._checkChildrenVisibility, 1000);
  }
  disconnectedCallback() {
    if (this._checkChildrenVisibility) {
      window.removeEventListener('DOMContentLoaded', this._checkChildrenVisibility);
      window.removeEventListener('load', this._checkChildrenVisibility);
      window.removeEventListener('scroll', this._checkChildrenVisibility);
      window.removeEventListener('resize', this._checkChildrenVisibility);
      window.removeEventListener('touchmove', this._checkChildrenVisibility);
    }
  }
  render() {
    return html`
      <slot></slot>
    `;
  }
}
customElements.define('hg-content', HgContent);
