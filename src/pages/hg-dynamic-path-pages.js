import {LitElement, html, css} from 'lit';
import {until} from 'lit/directives/until.js';
import {when} from 'lit/directives/when.js';
import sharedStyles from '../styles/shared-styles.js';
import '../content/hg-article/hg-intro-article.js';
import '../elements/hg-action-button.js';
import '../elements/hg-page/hg-page-loading.js';
import {FirebaseAuthController} from '../utils/FirebaseAuthController.js';
import {getAllDynamicPathPages} from '../utils.js';
import './hg-dynamic-path-pages/hg-dynamic-path-pages-list.js';

// todo add scrolling to dialogs

export class HgDynamicPathPages extends LitElement {
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
      <hg-intro-article .uid=${'events'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      ${!this._loggedIn ? '' : until(import('./hg-dynamic-path-pages/hg-dynamic-path-pages-add.js').then(() => {
        return html`
          <hg-dynamic-path-pages-add></hg-dynamic-path-pages-add>
        `;
      }))}
      <h2>Nadchodzące wydarzenia i aktualności</h2>
      ${when(
        this._allDynamicPathPagesReady,
        () => html`
            <hg-dynamic-path-pages-list
              .dynamicPathPages=${this._allDynamicPathPages}
              .showHidden=${this._loggedIn}
              .showControls=${this._loggedIn}>
            </hg-dynamic-path-pages-list>
          `,
        () => html`<hg-page-loading></hg-page-loading>`,
      )}
      <hg-action-button id="button" @click=${() => {
        this.shadowRoot.getElementById('archived').hidden = false;
        this.shadowRoot.getElementById('button').hidden = true;
      }}>Archiwum wydarzeń i aktualności</hg-action-button>
      <div id="archived" hidden>
        <h2>Archiwum wydarzeń i aktualności</h2>
        ${when(
          this._allDynamicPathPagesReady,
          () => html`
            <hg-dynamic-path-pages-list
              .dynamicPathPages=${this._allDynamicPathPages}
              .showHidden=${this._loggedIn}
              .archived=${true}>
            </hg-dynamic-path-pages-list>
          `,
          () => html`<hg-page-loading></hg-page-loading>`,
        )}
      </div>
    `;
  }
}
customElements.define('hg-dynamic-path-pages', HgDynamicPathPages);
