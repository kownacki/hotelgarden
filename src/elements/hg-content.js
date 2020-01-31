import {LitElement, css} from 'lit-element';

const isElementVisible = (element) => {
  const rect = element.getBoundingClientRect();
  return !(rect.top >= window.innerHeight) && !(rect.bottom <= 0);
};

const checkChildrenVisibility = _.throttle(100, (element) => {
  _.map((child) => {
    if (isElementVisible(child)) child.classList.add('seen');
  }, element.shadowRoot.children);
});

export default class HgContent extends LitElement {
  constructor() {
    super();
    this._eventToRemove = () => checkChildrenVisibility(this);
    addEventListener('DOMContentLoaded', this._eventToRemove);
    addEventListener('load', this._eventToRemove);
    addEventListener('scroll', this._eventToRemove);
    addEventListener('resize', this._eventToRemove);
    addEventListener('touchmove', this._eventToRemove);
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
    return css`
      :host > * {
        transition-property: opacity, top;
        transition-duration: 0.5s;
        transition-timing-function: ease-in-out;
        top: 30px;
        opacity: 0;
        position: relative;
      }
      :host > .seen {
        opacity: 1;
        top: 0;
      }
    `;
  }
}
customElements.define('hg-content', HgContent);
