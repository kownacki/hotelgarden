import {isElementVisible, isElementInProximity} from 'mk-frontend-web-utils/dom.js';
import {SubscriptionController} from './SubscriptionController.js';

const VISIBILITY_CHECK_EVENTS = ['DOMContentLoaded', 'load', 'scroll', 'resize', 'touchmove'];

/**
 * @typedef {Object} VisibilityController~Options
 * @property {number} [proximity=window.innerHeight] - Proximity parameter used to calculate inProximity.
 */

/**
 * Lit Element controller which notifies about element's visibility changes and stores it.
 * @property {boolean|undefined} visible - Whether element is visible. Undefined until determined.
 * @property {boolean|undefined} inProximity - Whether element is in proximity. Undefined until determined.
 */
export class VisibilityController {
  visible;
  inProximity;
  _host;
  _onVisibleChange;
  _onInProximityChange;
  _options;
  _subscription;
  /**
   * @param {object} host
   * @param {function(visible:boolean)} [onVisibleChange] - Called on visible change.
   * @param {function(inProximity:boolean)} [onInProximityChange] - Called on inProximity change.
   * @param {VisibilityController~Options} [options] - Options.
   */
  constructor(host, onVisibleChange, onInProximityChange, options = {}) {
    host.addController(this);
    this._host = host;
    this._onVisibleChange = onVisibleChange;
    this._onInProximityChange = onInProximityChange;
    this._options = options;
    this._subscription = new SubscriptionController(host, () => {
      VISIBILITY_CHECK_EVENTS.forEach((eventName) => {
        window.addEventListener(eventName, this._checkVisibility);
      });
      // todo is this event listener required to be removed?
      host.addEventListener('check-visibility', (event) => {
        this._checkVisibility();
        event.stopPropagation();
      });
      // todo heuristics to catch any not showing content when some movement happens
      setTimeout(this._checkVisibility, 1000);

      return () => {
        this._setVisible(undefined);
        this._setInProximity(undefined);
        VISIBILITY_CHECK_EVENTS.forEach((eventName) => {
          window.removeEventListener(eventName, this._checkVisibility);
        });
      }
    });
  }
  hostUpdated() {
    this._checkVisibility();
  }
  _checkVisibility = () => {
    // Wait till DOM is created
    if (this._host.hasUpdated) {
      this._setVisible(isElementVisible(this._host));
      this._setInProximity(isElementInProximity(this._host, this._options.proximity));
    }
  };
  _setVisible(value) {
    if (value !== this.visible) {
      this.visible = value;
      this._onVisibleChange?.(value);
    }
  }
  _setInProximity(value) {
    if (value !== this.inProximity) {
      this.inProximity = value;
      this._onInProximityChange?.(value);
    }
  }
}
