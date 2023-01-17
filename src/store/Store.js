export class Store {
  #state;
  #listeners;
  #reducer;

  constructor(state, reducer) {
    this.#state = state;
    this.#reducer = reducer;
  }

  getState() {
    return { ...this.#state };
  }

  subscribe(func) {
    this.#listeners = func;
  }

  publish() {
    this.#listeners();
  }

  async dispatch(actionKey, { ...payload } = {}) {
    this.#state = await this.#reducer(this.#state, actionKey, { ...payload });
    this.publish();
  }
}
