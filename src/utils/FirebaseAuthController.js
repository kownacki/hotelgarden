import {StateController} from './StateController.js';

/**
 * Lit Element controller which notifies about firebase auth state changes and stores it.
 * @property {boolean|undefined} loggedIn - Whether user is logged in. Undefined until determined.
 */
export class FirebaseAuthController {
  loggedIn;
  _onLoggedInChange;
  _state;
  /**
   * @param {object} host
   * @param {function(loggedIn:boolean)} [onLoggedInChange] - Called on loggedIn change.
   */
  constructor(host, onLoggedInChange) {
    host.addController(this);
    this._onLoggedInChange = onLoggedInChange;
    this._state = new StateController(host, (setState) => {
      return firebase.auth().onAuthStateChanged((user) => {
        this.loggedIn = Boolean(user);
        setState(this.loggedIn);
        this._onLoggedInChange?.(this.loggedIn);
      });
    });
  }
}
