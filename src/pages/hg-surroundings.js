import {LitElement, html, css} from 'lit';
import '../content/hg-article/hg-intro-article.js';
import '../content/hg-links.js';
import '../content/hg-text-image.js';
import '../elements/hg-content.js';
import sharedStyles from '../styles/shared-styles.js';
import {staticProp} from '../utils.js';

export class HgSurroundings extends LitElement {
  static properties = {
    config: Object,
    isInitialPage: Boolean,
  };
  static styles = [sharedStyles, css`
    hg-text-image {
      margin-bottom: 40px;
    }
  `];
  render() {
    return html`
      <hg-intro-article .uid=${'surroundings'} .isInitialPage=${this.isInitialPage}></hg-intro-article>
      <hg-content>
        <hg-text-image .uid=${'surroundings'} .buttons=${staticProp([{url: '/grill-garden', text: 'Zobacz więcej'}])}></hg-text-image>
        ${_.map.convert({cap: false})((icon, index) => html`
          <hg-text-image 
            .uid=${'surroundings-extra' + (index + 1)}
            .swap=${(index + 1)%2} 
            .noHeading=${true} 
            .iconFields=${staticProp(icon ? ['distance'] : null)}
            .iconSrcs=${staticProp([
              icon === 'foot'
                ? 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Fsports%2Fwalking.png?alt=media&token=66f78b58-15f0-48a4-928e-c0dfb5193739'
                : 'https://firebasestorage.googleapis.com/v0/b/pl-hotelgarden.appspot.com/o/icons%2Ftransport%2Fcar.png?alt=media&token=81886c9b-c2f4-4ab1-8996-8cc71d6f5cff',
            ])}
            .iconsAtEnd=${true}>
          </hg-text-image>
          ${index === 0 ? '' : html`<hg-content-icons .small=${true} .uid=${'surroundings-extra' + index}></hg-content-icons>`}
        `, [null, 'foot', 'foot', 'foot', 'car', 'car'])}
        <hg-links .path=${'/atrakcje-okolicy'} .superpath=${'/'}></hg-links>
      </hg-content>
    `;
  }
}
customElements.define('hg-surroundings', HgSurroundings);
