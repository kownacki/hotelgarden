import {LitElement, html, css} from 'lit';
import {staticProp} from '../../utils.js';
import HgContent from "../../elements/hg-content";
import '../../content/hg-article/hg-intro-article.js';
import '../../content/hg-text-image.js';
import '../../content/hg-links.js';

customElements.define('hg-surroundings', class extends HgContent {
  static get styles() {
    return [super.styles, css`
      hg-text-image {
        margin-bottom: 40px;
      }
    `];
  }
  render() {
    return html`
      <hg-intro-article .uid=${'surroundings'}></hg-intro-article>
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
    `;
  }
});
