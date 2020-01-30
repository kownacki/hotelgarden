import {LitElement, html, css} from 'lit-element';
import {links, staticProp} from '../utils.js';
import './hg-drawer/hg-drawer-item.js';

customElements.define('hg-drawer', class extends LitElement {
  static get properties() {
    return {
      selected: String,
      promotedEvent: Object,
      _nowOpened: HTMLElement,
    };
  }
  static get styles() {
    return css`
      .header {
        background: white;
        position: fixed;
        width: 100%;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      paper-icon-button {
        width: 44px;
        height: 44px;
        margin: calc((var(--headerHeight) - 44px) / 2);
      }
      nav {
        display: block;
        height: calc(100% - var(--headerHeight));
        margin-top: var(--headerHeight);
        overflow: auto;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        border-bottom: solid 1px var(--placeholder-color);
      }
      li:last-child {
        border-bottom: none;
      }
    `;
  }
  render() {
    return html`
      <div class="header">
        <paper-icon-button icon="close" @click=${() => this.dispatchEvent(new CustomEvent('close-drawer'))}></paper-icon-button>
      </div>
      <nav>
        <ul>
          ${!this.promotedEvent ? ''
            : html`<li class="event">
              <hg-drawer-item .link=${staticProp({
                path: '/wydarzenia/' + this.promotedEvent.uid,
                name: this.promotedEvent.title,
              })}>
              </hg-drawer-item>
            </li>`
          }
          ${_.map((link) => html`
            <li>
              <hg-drawer-item 
                .link=${link} 
                .selected=${this.selected}
                .opened=${_.some(['path', this.selected], link.sublinks)}>
              </hg-drawer-item>        
            </li>
          `, links)}
        </ul>
      </nav>
    `;
  }
});
