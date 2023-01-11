export default class PropertyFinder {
  #target;
  #cardContainer;
  #columnContainer;
  #cardContainers;
  #columnContainers;
  constructor(target) {
    this.#target = target;
    this.#cardContainer =
      target.closest('.new-card-container') ||
      target.closest('.card-container') ||
      (target.classList.contains('card-container') && target) ||
      (target.classList.contains('new-card-container') && target);
    this.#columnContainer =
      target.closest('.todo-list-column-container') ||
      (target.classList.contains('todo-list-column-container') && target);
    this.#cardContainers =
      this.#columnContainer.querySelectorAll('.card-container');
    this.#columnContainers = document.querySelectorAll(
      '.todo-list-column-container'
    );
  }
  getAllProperty() {
    return {
      columnIdx: this.getColumnIdx(),
      cardIdx: this.getCardIdx(),
      isModifying: this.getModifyingState(),
      cardData: {
        title: this.getTitle(),
        details: this.getDetails(),
        footer: 'author by web',
      },
      columnContainer: this.#columnContainer,
      cardContainer: this.#cardContainer,
    };
  }
  getColumnIdx() {
    return this.findIdx(this.#columnContainers, this.#columnContainer);
  }
  getCardIdx() {
    return this.findIdx(this.#cardContainers, this.#cardContainer);
  }
  getModifyingState() {
    return this.#cardContainer.classList.contains('modifying');
  }
  getTitle() {
    return this.#cardContainer.querySelector('.todo-list-contents-header-text')
      .value;
  }
  getDetails() {
    const ret = [];
    const $details = this.#cardContainer
      .querySelector('.todo-list-contents-desc-container')
      .querySelectorAll('input');
    $details.forEach((ele) => {
      if (ele.value) ret.push(ele.value);
    });
    return ret;
    // this[#cardContainer].querySelectorAll(...).map is not a function
    // return this.#cardContainer
    //   .querySelectorAll('.todo-list-contents-desc-container')
    //   .map((ele) => ele.value)
    //   .filter((ele) => ele !== '');
  }

  findIdx(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) return i;
    }
  }
}
