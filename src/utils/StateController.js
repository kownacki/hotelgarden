/**
 * @callback StateController~addStateObserver
 * @param {function(state:boolean)} setState - Used to set state.
 * @returns {function} Unsubscribe from observer.
 */

/**
 * Lit Element controller which manages adding and unsubscribing from state observer on element connecting and disconnecting.
 * State observer is user-provided. User must set state manually using state setter provided to `addStateObserver`.
 * @property {*} value - Managed state. Initially undefined.
 */
export class StateController {
  value;
  _addStateObserver;
  _unsubscribeFromStateObserver;
  /**
   * @param {object} host
   * @param {StateController~addStateObserver} addStateObserver - Function that is going to be used to add state observer. Observer is
   * responsible for setting state.
   */
  constructor(host, addStateObserver) {
    host.addController(this);
    this._addStateObserver = addStateObserver;
  }
  hostConnected() {
    const setState = (setState) => {
      this.value = setState;
    };
    this._unsubscribeFromStateObserver = this._addStateObserver(setState);
  }
  hostDisconnected() {
    this._unsubscribeFromStateObserver();
  }
}
