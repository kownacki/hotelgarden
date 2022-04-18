export class PromiseTrigger {
  promise: Promise<unknown>;
  // @ts-ignore
  resolve: (value?: unknown) => void;
  constructor() {
    this.promise = new Promise((resolve) => this.resolve = resolve);
  }
}
