import {LitElement, html, css} from 'lit';
import '@material/mwc-switch';
import '@material/mwc-textfield';
import '../../utils/fixes/mwc-formfield-fixed.js';
import {getDayOfWeek, sleep} from '../../utils.js';
import sharedStyles from '../../styles/shared-styles.js';

const animationLength = 200;

export class HgLunchEditDialogDay extends LitElement {
  static properties = {
    day: Number,
    lunches: Object,
    _disabled: Boolean,
    _animationGoing: Boolean,
  };
  static styles = [sharedStyles, css`
    :host {
      font-size: 16px;
      display: block
    }
    .subheading {
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
    }
    .day {
      font-size: 18px;
      margin-right: 20px;
      line-height: 25px;
      font-weight: 700;
    }
    mwc-formfield-fixed {
      display: block;
      width: 250px;
    }
    #courses-collapse {
      overflow: hidden;
      transition: height ${animationLength}ms ease-in;
    }
    .course {
      margin: 15px 0;
      font-weight: 700;
    }
    .courses {
      padding-bottom: 20px;
    }
    .textfields {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    mwc-textfield {
      width: calc(50% - 10px);
      margin-bottom: 5px;
    }
    @media all and (max-width: 719px) {
      mwc-textfield {
        width: 100%;
      }
    }
    @media all and (max-width: 479px) {
      .subheading {
        display: block;
      }
      mwc-formfield-fixed {
        margin-top: 20px;
      }
    }
  `];
  firstUpdated() {
    this._disabled = _.get('disabled', this.lunches);
  }
  async updated(changedProperites) {
    if (changedProperites.has('_disabled')) {
      const courses = this.shadowRoot.getElementById('courses');
      const coursesCollapse = this.shadowRoot.getElementById('courses-collapse');
      const thisAnimation = {};
      this.currentAnimation = thisAnimation;
      if (this._disabled) {
        coursesCollapse.style.height = courses.offsetHeight + 'px';
        await sleep();
        coursesCollapse.style.height = '0';
      } else if (courses.offsetHeight) {
        coursesCollapse.style.height = courses.offsetHeight + 'px';
        await sleep(animationLength);
        if (thisAnimation === this.currentAnimation) {
          coursesCollapse.style.height = 'auto';
        }
      }
    }
  }
  getData() {
    let values = {disabled: Boolean(this._disabled)};
    let firstUnfilledRequiredInput;
    _.map((course) => {
      _.map((field) => {
        const path = `${course}.${field}`;
        const input = this.shadowRoot.getElementById(path);
        values = _.setWith(Object, path, input.value, values);
        if (!firstUnfilledRequiredInput && !this._disabled && input.required && !input.value) {
          firstUnfilledRequiredInput = input;
        }
      }, ['name', 'description'])
    }, [1, 2]);
    return {values, firstUnfilledRequiredInput};
  }
  render() {
    return html`
      <div class="subheading">
        <div class="day">${getDayOfWeek(this.day)}</div>
        <mwc-formfield-fixed .label=${this._disabled ? 'Bez lunchu w ten dzień' : 'Lunch dostępny w ten dzień'}>
          <mwc-switch 
            .selected=${!_.get('disabled', this.lunches)}
            @click=${(event) => this._disabled = !event.target.selected}>
          </mwc-switch>
        </mwc-formfield-fixed>
      </div>
      <div id="courses-collapse">
        <div class="courses" id="courses">
          ${_.map((course) => html`
            <div class="course">${{1: 'I', 2: 'II'}[course]} danie:</div>
            <div class="textfields">
              ${_.map((field) => html`
                <mwc-textfield
                  id="${course}.${field}"
                  .required=${field === 'name'}
                  .validationMessage=${'Pole wymagane'}
                  .placeholder=${`np. ${(course === 1
                    ? {name: 'Zupa pomidorowa', description: 'z makaronem'}
                    : {name: 'Kotlet schabowy', description: 'ziemniaki / surówka'}
                  )[field]}`}
                  .label=${{name: 'Nazwa', description: 'Podpis'}[field]}
                  .value=${_.get(`${course}.${field}`, this.lunches) || ''}>
                </mwc-textfield>
              `, ['name', 'description'])}
            </div>
          `, [1, 2])}
        </div>
      </div>
    `;
  }
}
customElements.define('hg-lunch-edit-dialog-day', HgLunchEditDialogDay);
