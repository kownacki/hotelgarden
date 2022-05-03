import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {when} from 'lit/directives/when.js';
import sharedStyles from '../../styles/shared-styles.js';
import '../../content/hg-article/hg-intro-article.js';
import '../../elements/hg-action-button.js';
import '../../elements/hg-page/hg-page-loading.js';
import {FirebaseAuthController} from '../../utils/FirebaseAuthController.js';
import {getAllDynamicPathPages} from '../../utils.js';
import './hg-events/hg-events-and-news-list.js';

// todo add scrolling to dialogs

export class HgEvents extends LitElement {
  _firebaseAuth;
  static properties = {
    _loggedIn: Boolean,
    _allDynamicPathPages: Array, // DynamicPathPage[]
    _allDynamicPathPagesReady: Boolean,
  };
  static styles = [sharedStyles, css`
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
  constructor() {
    super();
    this._firebaseAuth = new FirebaseAuthController(this, (loggedIn) => {
      this._loggedIn = loggedIn;
    });
    (async () => {
      this._allDynamicPathPages = await getAllDynamicPathPages();
      this._allDynamicPathPagesReady = true;
    })();
  }
  render() {
    return html`
      <hg-intro-article .uid=${'events'}></hg-intro-article>
      ${!this._loggedIn ? '' : until(import('./hg-events/hg-events-add.js').then(() => {
        return html`<hg-events-add></hg-events-add>`;
      }))}
      <h2>Nadchodzące wydarzenia</h2>
      ${when(
        this._allDynamicPathPagesReady,
        () => html`
            <hg-events-and-news-list
              .events=${this._allDynamicPathPages}
              .noNonPublic=${!this._loggedIn}>
            </hg-events-and-news-list>
          `,
        () => html`<hg-page-loading></hg-page-loading>`,
      )}
      <hg-action-button id="button" @click=${() => {
        this.shadowRoot.getElementById('past').hidden = false;
        this.shadowRoot.getElementById('button').hidden = true;
      }}>Pokaż minione wydarzenia</hg-action-button>
      <div id="past" hidden>
        <h2>Minione wydarzenia</h2>
        ${when(
          this._allDynamicPathPagesReady,
          () => html`
            <hg-events-and-news-list
              .events=${this._allDynamicPathPages}
              .noNonPublic=${!this._loggedIn}
              .past=${true}>
            </hg-events-and-news-list>
          `,
          () => html`<hg-page-loading></hg-page-loading>`,
        )}
      </div>
    `;
  }
}
customElements.define('hg-events', HgEvents);
