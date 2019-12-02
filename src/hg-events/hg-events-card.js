import {LitElement, html, css} from 'lit-element';
import {hyphenate} from '../utils.js'

customElements.define('hg-events-card', class extends LitElement {
  static get properties() {
    return {
      event: Object,
    };
  }
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 20px 0;
        background: rgba(var(--secondary-color-rgb), 0.075);
        transition: background 0.3s ease;
      }
      :host(:hover) {
        background: rgba(var(--primary-color-rgb), 0.25);
      }
      .content {
        flex: 1;
        padding: 20px;
      }
      a {
        color: var(--secondary-color);
        text-decoration: none;
        display: flex;
      }
      iron-image {
        width: 300px;
        min-width: 300px;
        height: 200px;
      }
      .header {
        display: flex;
        align-items: baseline;
      }
      h3 {
        flex: 1;
        color: var(--primary-color);
        font-weight: 400;
        font-size: 24px;
        margin: 0 20px 0 0;
      }
      .date {
        color: var(--primary-color);
        font-size: 18px;
      }
      .more {
        color: var(--primary-color);
        font-size: 18px;
      }
      iron-icon {
        height: 22px;
        width: 22px;
        vertical-align: text-bottom;
      }
    `;
  }
  render() {
    return html`
      <a href="/wydarzenia/${hyphenate(this.event.title)}">
        <iron-image .src=${this.event.image} .sizing=${'cover'}></iron-image>
        <div class="content">
          <div class="header">
            <h3>${this.event.title}</h3>
            <div class="date">${this.event.date.split('-').reverse().join(' / ')}</div>
          </div>
          <p>${this.event.description}</p>
          <div class="more">Zobacz więcej <iron-icon icon="add"></iron-icon></div>
        </div>
      </a>
    `;
  }
});
