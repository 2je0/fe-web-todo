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
      target.closest('.card-container');
    this.#columnContainer = target.closest('.todo-list-column-container');
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
    const $details = this.#cardContainer.querySelector(
      '.todo-list-contents-desc-container'
    );
    const areaText = $details
      .querySelector('textarea')
      ?.value.split('\n')
      .filter((ele) => ele !== '');
    const liText = [...$details.querySelectorAll('li')].map(
      ({ value }) => value
    );
    return liText.length ? liText : areaText;
  }

  findIdx(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) return i;
    }
  }
}
