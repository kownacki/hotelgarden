import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {when} from 'lit/directives/when.js';
import {sortBy} from 'lodash-es';
import {isDynamicPathPageArchived, isDynamicPathPageHidden} from '../../../utils/events.js';
import {createDynamicPath} from '../../../utils/urlStructure.js';
import sharedStyles from '../../styles/shared-styles.js';

export class HgEventSidebar extends LitElement {
  static properties = {
    selected: String, // EventUid
    dynamicPathPages: Array, // DynamicPathPage[]
    _currentDynamicPathPages: Array,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
      text-align: center;
      box-sizing: border-box;
    }
    .container {
      background: rgba(var(--primary-color-rgb), 10%);
      padding: 40px 20px;
    }
    h2 {
      font-weight: 400;
      font-size: 25px;
      margin: 0;
    }
    ul {
      padding: 0;
    }
    li {
      list-style-type: none;
      margin: 5px 0;
    }
    li a {
      display: block;
      padding: 8px;
      color: var(--secondary-color);
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    li a:hover, li[selected] a {
      background: rgba(var(--primary-color-rgb), 90%);
      color: white;
    }
    a.all {
      display: block;
      padding: 8px 16px;
      background: rgba(var(--accent-color-rgb), 90%);
      color: white;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    a.all:hover {
      background: rgba(var(--accent-color-rgb), 70%);
    }
  `];
  willUpdate(changedProperties) {
    if (changedProperties.has('dynamicPathPages')) {
      const currentDynamicPathPages = this.dynamicPathPages
        .filter((dynamicPathPage) => !isDynamicPathPageHidden(dynamicPathPage))
        .filter((dynamicPathPage) => !isDynamicPathPageArchived(dynamicPathPage));
      this._currentDynamicPathPages = sortBy(currentDynamicPathPages, 'date');
    }
  }
  render() {
    return html`
      <div class="container smaller-text">
        ${when(
          this._currentDynamicPathPages.length > 0,
          () => html`<h2>Nadchodzące wydarzenia i aktualności</h2>`
        )}
        <nav>
          ${when(
            this._currentDynamicPathPages.length > 0,
            () => html`
              <ul>
                ${repeat(
                  this._currentDynamicPathPages,
                  (dynamicPathPage) => dynamicPathPage.uid,
                  (dynamicPathPage) => html`
                    <li ?selected=${this.selected === dynamicPathPage.uid}>
                      <a href=${createDynamicPath(dynamicPathPage.permalink)}>
                        ${dynamicPathPage.title}
                      </a>
                    </li>
                  `,
                )}
              </ul>
            `,
          )}
          <a class="all" href="/wydarzenia">Wszystkie wydarzenia i aktualności</a>
        </nav>
      </div>
    `;
  }
}
customElements.define('hg-event-sidebar', HgEventSidebar);
