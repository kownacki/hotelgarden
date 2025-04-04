import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import sharedStyles from '../styles/shared-styles.js';
import {array} from '../utils.js';
import './hg-slider/hg-slider-move.js'

//todo bug clicking go back when image is displayed breaks website
export class HgSlider extends LitElement {
  static properties = {
    selected: Number,
    items: Array,
    template: Function,
    double: {type: Boolean, reflect: true},
    transitionGoing: Boolean,
  };
  static styles = [sharedStyles, css`
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
    hg-slider-move {
      position: absolute;
      top: calc(50% - 20px);
    }
    hg-slider-move, .counter {
      background: rgba(255, 255, 255, 0.5);
    }
    hg-slider-move#left {
      left: 2px;
    }
    hg-slider-move#right {
      right: 2px;
    }
  `];
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
      ${_.size(this.items) < 2 ? '' : html`
        <div class="counter">${this.selected + 1} / ${_.size(this.items)}</div>
        <hg-slider-move
          id="left"
          .direction=${'left'}
          @click=${() => !this.transitionGoing && this.move('left')}>
        </hg-slider-move>
        <hg-slider-move
          id="right"
          .direction=${'right'}
          @click=${() => !this.transitionGoing && this.move('right')}>
        </hg-slider-move>
      `}
    `;
  }
}
customElements.define('hg-slider', HgSlider);
