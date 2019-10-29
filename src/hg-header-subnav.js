import {LitElement, html, css} from 'lit-element';

customElements.define('hg-header-subnav', class extends LitElement {
  static get properties() {
    return {
      links: Array,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        background: white;
      }
      ul {
        padding: 0;
      }
      li {
        list-style-type: none;
      }
    `;
  }
  render() {
    return html`
      <ul>
        ${_.map((link) => html`
          <li><a href="${link.path}">${link.name}</a></li>
        `, this.links)}
      </ul>
    `;
  }
});
