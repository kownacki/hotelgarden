import {LitElement, html, css} from 'lit-element';
import './hg-menu/hg-menu.js'

customElements.define('hg-cuisine', class extends LitElement {
  static get properties() {
    return {};
  }
  static get styles() {
    return css`
    `;
  }
  render() {
    return html`
      <hg-banner 
        .src=${'https://picsum.photos/id/75/1920/980'}
        .heading=${'Kuchnia'}
        .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
      </hg-banner>
      <hg-article .uid=${'landing'}></hg-article>
      <hg-icons .uid=${'landing'}></hg-icons>
      <hg-content-slider></hg-content-slider>
      <hg-mosaic .uid=${'landing'}></hg-mosaic>
      <hg-menu></hg-menu> 
      <hg-links .path=${'/kuchnia'} .superpath=${'/kuchnia'}></hg-links>
    `;
  }
});
