import {LitElement, html, css} from 'lit';
import sharedStyles from '../../../styles/shared-styles.js'

export class HgEventsCard extends LitElement {
  static properties = {
    event: Object,
  };
  static styles = [sharedStyles, css`
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
      padding: 40px;
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
      flex-direction: row-reverse;
      align-items: baseline;
    }
    h3 {
      flex: 1;
      font-weight: 400;
      font-size: 24px;
      margin: 0 20px 0 0;
    }
    .non-public {
      color: red;
      text-transform: uppercase;
    }
    .date {
      color: var(--primary-color);
      font-size: 18px;
      margin-bottom: 5px;
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
    @media all and (max-width: 839px) {
      .header {
        display: block;
      }
    }
    @media all and (max-width: 839px) {
      iron-image {
        width: 200px;
        min-width: 200px;
        height: 250px;
      }
    }
    @media all and (max-width: 599px) {
      .content {
        padding: 20px;
      }
      iron-image {
        width: 100%;
        min-width: auto;
        height: 200px;
      }
      a {
        display: block;
      }
    }
  `];
  render() {
    return html`
      <a href="/wydarzenia/${this.event.uid}">
        <iron-image .src=${_.get('image.url', this.event)} .sizing=${'cover'}></iron-image>
        <div class="content">
          <div class="header">
            <div class="date">${this.event.date.split('-').reverse().join(' / ')}</div>
            <h3>${this.event.public ? '' : html`<span class="non-public">Niepubliczne </span>`}${this.event.title}</h3>
          </div>
          <p>${this.event.description}</p>
          <div class="more">Zobacz więcej <iron-icon .icon=${'add'}></iron-icon></div>
        </div>
      </a>
    `;
  }
}
customElements.define('hg-events-card', HgEventsCard);
