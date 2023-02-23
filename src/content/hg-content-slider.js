import {LitElement, html, css} from 'lit';
import '../elements/hg-image-slider.js';
import '../elements/hg-content-label.js';
import {createDbPath} from '../utils/database.js';

export class HgContentSlider extends LitElement {
  static properties = {
    uid: String,
  };
  static styles = css`
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
  render() {
    return html`
      <hg-image-slider .double=${true} .path=${createDbPath(`contentSliders/${this.uid}`)}></hg-image-slider>      
      <hg-content-label .name=${'Slider - dodaj przynajmniej 2 obrazy'}></hg-content-label>
    `;
  }
}
customElements.define('hg-content-slider', HgContentSlider);
