import {LitElement, html, css} from 'lit-element';
import './hg-banner.js';
import './hg-article.js';
import './hg-quote.js';
import './hg-icons/hg-icons.js';
import './hg-mosaic.js';
import './hg-infographic.js';
import './hg-content-carousel.js';

customElements.define('hg-landing', class extends LitElement {
  static get properties() {
    return {
    };
  }
  static get styles() {
    return css`
      :host {
      }
    `;
  }
  render() {
    return html`
      <hg-banner 
        .src=${'https://picsum.photos/id/1040/1920/980'}
        .heading=${'Hotel Garden'}
        .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
      </hg-banner>
      <hg-article .uid=${'landing'}></hg-article>
      <hg-quote .uid=${'landing'}></hg-quote>
      <hg-icons .uid=${'landing'}></hg-icons>
      <hg-mosaic .uid=${'landing'}></hg-mosaic>
      <hg-infographic></hg-infographic>
      <hg-content-carousel></hg-content-carousel>
    `;
  }
});
