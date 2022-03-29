/**
 * @callback SubscriptionController~addSubscription
 * @returns {function} Unsubscribe.
 */

/**
 * Lit Element controller which manages adding subscription and unsubscribing when connecting and disconnecting.
 */
export class SubscriptionController {
  _addSubscription;
  _unsubscribe;
  /**
   * @param {object} host
   * @param {SubscriptionController~addSubscription} addSubscription - Function that is going to be used to add subscription.
   */
  constructor(host, addSubscription) {
    host.addController(this);
    this._addSubscription = addSubscription;
  }
  hostConnected() {
    this._unsubscribe = this._addSubscription();
  }
  hostDisconnected() {
    this._unsubscribe();
  }
}
