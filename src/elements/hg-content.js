import {LitElement, css} from 'lit-element';
import sharedStyles from '../styles/shared-styles.js';

const isElementVisible = (element) => {
  const rect = element.getBoundingClientRect();
  return !(rect.top >= window.innerHeight) && !(rect.bottom <= 0);
};

const checkChildrenVisibility = _.throttle(100, (element) => {
  _.map((child) => {
    if (isElementVisible(child)) {
      child.classList.add('seen');
      child.seen = true;
    }
  }, element.shadowRoot.children);
});

export default class HgContent extends LitElement {
  constructor() {
    super();
    this._eventToRemove = () => checkChildrenVisibility(this);
    this._eventToRemove();
    addEventListener('DOMContentLoaded', this._eventToRemove);
    addEventListener('load', this._eventToRemove);
    addEventListener('scroll', this._eventToRemove);
    addEventListener('resize', this._eventToRemove);
    addEventListener('touchmove', this._eventToRemove);
    this.addEventListener('check-visibility', (event) => {
      this._eventToRemove();
      event.stopPropagation();
    });
    // todo heuristics to catch any not showing content when some movement happens
    setTimeout(this._eventToRemove, 1000);
  }
  disconnectedCallback() {
    window.removeEventListener('DOMContentLoaded', this._eventToRemove);
    window.removeEventListener('load', this._eventToRemove);
    window.removeEventListener('scroll', this._eventToRemove);
    window.removeEventListener('resize', this._eventToRemove);
    window.removeEventListener('touchmove', this._eventToRemove);
    return super.disconnectedCallback();
  }
  static get styles() {
    return [sharedStyles, css`
      /* Prevent bugs. Iphone adds style tag as host's last child. */
      :host > :not(style):not(.no-animation) {
        transition-property: opacity, top;
        transition-duration: 0.5s;
        transition-timing-function: ease-in-out;
        top: 30px;
        opacity: 0;
        position: relative;
      }
      :host > .seen:not(.no-animation) {
        opacity: 1;
        top: 0;
      }
    `];
  }
}
customElements.define('hg-content', HgContent);
