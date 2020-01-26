import {LitElement, html, css} from 'lit-element';
import {staticProp} from '../utils.js';
import '../elements/hg-image-slider.js';
import '../elements/hg-content-label.js';

customElements.define('hg-content-slider', class extends LitElement {
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
          margin: 40px auto;
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
});
