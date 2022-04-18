export class PromiseTrigger {
    constructor() {
        this.promise = new Promise((resolve) => this.resolve = resolve);
    }
}
