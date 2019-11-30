import {LitElement, html, css} from 'lit-element';

customElements.define('hg-villa-garden', class extends LitElement {
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
        .src=${'/resources/images/villa.jpg'}
        .heading=${'Villa Garden'}
        .subheading=${'Lorem ipsum dolor sit amet consectetur adipiscing elit'}>
      </hg-banner>
      <hg-article .uid=${'landing'}></hg-article>
      <hg-icons .uid=${'landing'}></hg-icons>
      <hg-mosaic .uid=${'landing'}></hg-mosaic>
      <hg-links .path=${'/villa-garden'} .superpath=${'/'}></hg-links>
    `;
  }
});
