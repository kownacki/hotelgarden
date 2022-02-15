import {LitElement, html, css} from 'lit';
import {staticProp} from '../utils.js';
import '../elements/hg-image-slider.js';
import '../elements/hg-content-label.js';

export class HgContentSlider extends LitElement {
  static get properties() {
    return {
      uid: String,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1200px;
        margin: 100px auto;
        height: 350px;
      }
      :host(:hover) hg-content-label {
        display: block;
      }
      hg-image-slider {
        height: 100%;
      }
      @media all and (max-width: 959px) {
        :host {
          margin: 70px auto;
        }
      }
      @media all and (max-width: 599px) {
        :host {
          height: 300px;
          margin: 40px auto;
        }
      }
      @media all and (max-width: 479px) {
        :host {
          height: 250px;
        }
      }
    `;
  }
  render() {
    return html`
      <hg-image-slider .double=${true} .path=${staticProp({doc: 'contentSliders/' + this.uid})}></hg-image-slider>      
      <hg-content-label .name=${'Slider'}></hg-content-label>
    `;
  }
}
customElements.define('hg-content-slider', HgContentSlider);
