import {LitElement, html, css} from 'lit-element';
import './hg-banner.js';

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
        .src=${'https://picsum.photos/id/174/1920/980'}
        .heading=${'Hotel Garden'}
        .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
      </hg-banner>
    `;
  }
});
