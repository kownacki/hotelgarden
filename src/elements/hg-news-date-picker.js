import {LitElement, html, css} from 'lit';
import {when} from 'lit/directives/when.js';
import {getTodayDate} from '../../utils/general.js';
import '../edit/hg-date-range-picker.js';
import sharedStyles from '../styles/shared-styles.js';

const labels = {
  publishDate: 'Data rozpoczęcia publikacji',
  unpublishDate: 'Data zakończenia publikacji',
  error: 'Data zakończenia publikacji nie może być miniona. Data zakończenia musi następować po dacie rozpoczęcia.',
};

export class HgNewsDatePicker extends LitElement {
  static properties = {
    // properties
    dateCorrect: Boolean,
    publishDate: String,
    unpublishDate: String,
  };
  static styles = [sharedStyles, css`
    :host {
      display: block;
    }
    mwc-formfield-fixed {
      display: block;
      margin-bottom: 20px;
    }
    .date-info {
      color: var(--error-color);
    }
  `];
  updated(changedProperties) {
    if (changedProperties.has('publishDate') || changedProperties.has('unpublishDate')) {
      const newDate = this.getDate();
      this.dispatchEvent(new CustomEvent('date-changed', {detail: newDate}));
    }
  }
  getDate() {
    return {
      publishDate: this.publishDate,
      unpublishDate: this.unpublishDate,
    };
  }
  render() {
    const todayDate = getTodayDate();
    const minEndDate = todayDate;
    const datesSet = this.publishDate && this.unpublishDate;
    return html`
      <hg-date-range-picker
        .minEndDate=${minEndDate}
        .startDateLabel=${labels.publishDate}
        .endDateLabel=${labels.unpublishDate}
        .startDate=${this.publishDate}
        .endDate=${this.unpublishDate}
        @start-date-changed=${({detail: date}) => {
          this.publishDate = date;
        }}
        @end-date-changed=${({detail: date}) => {
          this.unpublishDate = date;
        }}>
      </hg-date-range-picker>
      <p class="date-info smaller-text">
        ${when(!datesSet,
          () => 'Data jest wymagana',
          () => when(!this.dateCorrect,
            () => labels.error,
          ),
        )}
      </p>
    `;
  }
}
customElements.define('hg-news-date-picker', HgNewsDatePicker);
