import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import {array} from '../utils.js';

//todo bug clicking go back when image is displayed breaks website
customElements.define('hg-slider', class extends LitElement {
  static get properties() {
    return {
      selected: Number,
      items: Array,
      template: Function,
      double: {type: Boolean},
      transitionGoing: Boolean,
    };
  }
  static get styles() {
    return css`      
      :host {
        display: block;
        background: white;
        position: relative;
        overflow: hidden;
      }
      #slider {
        right: -100%;
        top: 0;
        width: 300%;
        height: 100%;
        position: absolute;
        display: flex;
      }
      @media all and (min-width: 600px) {
        :host([double]) #slider {
          right: -50%;
          width: 200%;
        }
      }
      #slider > * {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
      }
      .counter {
        font-size: 16px;
        top: 2px;
        left: 2px;
        position: absolute;
        padding: 8px;
      }
      paper-icon-button {
        position: absolute;
        top: calc(50% - 20px);
        height: 45px;
        width: 45px;
      }
      paper-icon-button, .counter {
        background: rgba(255, 255, 255, 0.5);
      }
      paper-icon-button#left {
        left: 2px;
      }
      paper-icon-button#right {
        right: 2px;
      }
    `;
  }
  constructor() {
    super();
    this.selected = 0;
  }
  move(direction) {
    const slider = this.shadowRoot.getElementById('slider');
    slider.style.right = direction === 'right' ? '0': ((this.double && window.innerWidth >= 600) ? '-100%' : '-200%');
    slider.style.transition = 'all 0.3s ease';
    this.transitionGoing = true;
    _.delay(300, () => {
      this.transitionGoing = false;
      slider.style.transition = 'none';
      slider.style.right = ((this.double && window.innerWidth >= 600) && window.innerWidth ? '-50%' : '-100%');
      this.selected = (direction === 'right' ? array.nextIndex : array.prevIndex)(this.selected, this.items);
      this.dispatchEvent(new CustomEvent('selected-changed', {detail: this.selected}));
    });
  }
  render() {
    return html`
      <div id="slider">
        ${_.isEmpty(this.items) ? ''
          : repeat([
              array.prevItem(this.selected, this.items), 
              this.items[this.selected], 
              array.nextItem(this.selected, this.items),
              ...((this.double && window.innerWidth >= 600) ? [array.nextItem(array.nextIndex(this.selected, this.items), this.items)] : [])
            ], _.get('name'), this.template)}
      </div>
      <div class="counter">${this.selected + 1} / ${_.size(this.items)}</div>
      <paper-icon-button
        ?disabled=${this.transitionGoing || _.size(this.items) === 1}
        id="left"
        icon="chevron-left"
        @click=${() => this.move('left')}>
      </paper-icon-button>
      <paper-icon-button
        ?disabled=${this.transitionGoing || _.size(this.items) === 1}
        id="right"
        icon="chevron-right"
        @click=${() => this.move('right')}>
      </paper-icon-button>
    `;
  }
});
