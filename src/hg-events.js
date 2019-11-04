import {LitElement, html, css} from 'lit-element';
import {repeat} from 'lit-html/directives/repeat';
import './hg-events-card.js';

customElements.define('hg-events', class extends LitElement {
  static get properties() {
    return {
      events: Array,
    };
  }
  constructor() {
    super();
    this.events = [{
      uid: Date.now(),
      title: 'Lorem ipsum dolor sit amet',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://picsum.photos/id/2/1920/980',
      date: '7 / 11 / 19',
    }, {
      uid: Date.now(),
      title: 'Lorem ipsum dolor sit amet',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      image: 'https://picsum.photos/id/2/1920/980',
      date: '7 / 11 / 19',
    }];
  }
  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 1300px;
        margin: auto;
      }
    `;
  }
  render() {
    return html`
      ${repeat(this.events, _.get('uid'), (event, index) => html`
        <hg-events-card .event=${event}></hg-events-card>
      `)}
    `;
  }
});
