import {LitElement, html, css} from 'lit';
import {links} from '../../../utils/urlStructure.js';
import {staticProp} from '../../utils.js';
import './hg-drawer-close.js';
import './hg-drawer-item.js';

export class HgDrawerContent extends LitElement {
  static properties = {
    selected: String,
    promotedEvent: Object,
    _nowOpened: HTMLElement,
  };
  static styles = css`
    :host {
      background: white;
    }
    .header {
      position: fixed;
      width: 100%;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    hg-drawer-close {
      display: block;
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
  render() {
    return html`
      <div class="header">
        <hg-drawer-close
          @click=${() => this.dispatchEvent(new CustomEvent('close-drawer'))}>
        </hg-drawer-close>
      </div>
      <nav>
        <ul>
          ${!this.promotedEvent || moment().isAfter(this.promotedEvent.date, 'day') ? ''
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
}
customElements.define('hg-drawer-content', HgDrawerContent);
