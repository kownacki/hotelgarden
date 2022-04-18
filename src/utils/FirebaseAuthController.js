import {authDeferred} from './database.js';
import {SubscriptionController} from './SubscriptionController.js';

/**
 * Lit Element controller which notifies about firebase auth state changes and stores it.
 * @property {boolean|undefined} loggedIn - Whether user is logged in. Undefined until determined.
 */
export class FirebaseAuthController {
  loggedIn;
  _onLoggedInChange;
  _subscription;
  /**
   * @param {object} host
   * @param {function(loggedIn:boolean)} [onLoggedInChange] - Called on loggedIn change.
   */
  constructor(host, onLoggedInChange) {
    host.addController(this);
    this._onLoggedInChange = onLoggedInChange;

    (async () => {
      const {auth, onAuthStateChanged} = await authDeferred;
      this._subscription = new SubscriptionController(host, () => {
        return onAuthStateChanged(auth, (user) => {
          this._setLoggedIn(Boolean(user));
        });
      });
    })();
  }
  _setLoggedIn(value) {
    if (value !== this.loggedIn) {
      this.loggedIn = value;
      this._onLoggedInChange?.(value);
    }
  }
}
