import {LitElement, html, css} from 'lit';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import './hg-drawer/hg-drawer-content.js';

export class HgDrawer extends LitElement {
  static properties = {
    selected: String,
    promotedDynamicPathPage: Object, // DynamicPathPageEventWithUid | DynamicPathPageNewsWithUid | undefined
    // observables
    drawer: Element,
    _drawerOnceOpened: Boolean
  };
  static styles = css`
    app-drawer {
      z-index: var(--layer-header-1);
    }
  `;
  firstUpdated() {
    this.drawer = this.shadowRoot.getElementById('drawer');
  }
  render() {
    return html`
      <app-drawer
        id="drawer"
        .swipeOpen=${true}
        @opened-changed=${({detail: opened}) => {
          if (opened) {
            this._drawerOnceOpened = true;
          }
        }}>
        ${!this._drawerOnceOpened ? ''
          : html`
            <hg-drawer-content
              .selected=${this.selected}
              .promotedDynamicPathPage=${this.promotedDynamicPathPage}
              @close-drawer=${() => this.shadowRoot.getElementById('drawer').close()}>
            </hg-drawer-content>
          `}
      </app-drawer>
    `;
  }
}
customElements.define('hg-drawer', HgDrawer);
