import { CLASS } from '../constants.js';
import { $, $$ } from './util.js';

export default class PropertyFinder {
  #target;
  #cardContainer;
  #columnContainer;
  #cardContainers;
  #columnContainers;
  constructor(target) {
    this.#target = target;
    this.#cardContainer =
      target.closest(CLASS.NEWCARD) || target.closest(CLASS.CARD);
    this.#columnContainer = target.closest(CLASS.COLUMN);
    this.#cardContainers = $$(CLASS.CARD, this.#columnContainer);
    this.#columnContainers = $$(CLASS.COLUMN);
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
    return $(CLASS.CARD_TITLE, this.#cardContainer).value;
  }
  getDetails() {
    const $details = $(CLASS.CARD_DETAILS, this.#cardContainer);
    const areaText = $('textarea', $details)
      ?.value.split('\n')
      .filter((ele) => ele !== '');
    const liText = [...$$('li', $details)].map(({ value }) => value);
    return liText.length ? liText : areaText;
  }

  findIdx(arr, target) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) return i;
    }
  }
}
