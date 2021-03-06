import {LitElement, html, css} from 'lit-element';
import sharedStyles from '../../styles/shared-styles.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../elements/hg-action-button.js';
import './hg-events/hg-events-add.js';
import './hg-events/hg-events-list.js';

// todo add scrolling to dialogs

customElements.define('hg-events', class extends LitElement {
  static get properties() {
    return {
      _loggedIn: Boolean,
    };
  }
  constructor() {
    super();
    this._unsubscribeLoggedInListener = auth.onAuthStateChanged((user) => this._loggedIn = Boolean(user));
  }
  disconnectedCallback() {
    this._unsubscribeLoggedInListener();
    return super.disconnectedCallback();
  }
  static get styles() {
    return [sharedStyles, css`
      :host {
        max-width: 1000px;
        display: block;
        margin: 40px auto;
        padding: 0 20px;
      }
      hg-intro-article {
        display: none;
      }
      h2 {
        margin: 40px 0;
      }
      hg-action-button {
        margin: 20px 0 10px;
      }
    `];
  }
  render() {
    return html`
      <hg-intro-article .uid=${'events'}></hg-intro-article>
      ${!this._loggedIn ? '' : html`<hg-events-add></hg-events-add>`}
      <h2>Nadchodzące wydarzenia</h2>
      <hg-events-list></hg-events-list>
      <hg-action-button id="button" @click=${() => {
        this.shadowRoot.getElementById('past').hidden = false;
        this.shadowRoot.getElementById('button').hidden = true;
      }}>Pokaż minione wydarzenia</hg-action-button>
      <div id="past" hidden>
        <h2>Minione wydarzenia</h2>
        <hg-events-list .past=${true}></hg-events-list>
      </div>
    `;
  }
});
