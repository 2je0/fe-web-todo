import { modalShow } from '../util/util.js';
import Component from '../core/Component.js';
import DragEvent from '../event/DragEvent.js';
import { TodoListStore } from '../store/TodoListStore.js';
import BUTTON from './Button.js';
import NewCard from './NewCard.js';
import { CLASS } from '../constants.js';
import { $ } from '../util/util.js';

export default class Card extends Component {
  setup() {
    const { columns } = TodoListStore.getState();
    this.$state = columns[this.$props.columnIdx].cards[this.$props.cardIdx];
  }

  template() {
    const card = this.$state;
    if (!card) return '';
    return `
    <div class="todo-list-contents-container">
      <div class="todo-list-contents-header-container">
        <div class="todo-list-contents-header-text">${card.title}</div>
        ${BUTTON.CARD_X_BUTTON}
      </div>
      <ul class="todo-list-contents-desc-container">
        ${card.details.map((ele) => `<li>${ele}</li>`).join('')}
      </ul>
      <div class="todo-list-contents-footer">${card.footer}</div>
    </div>
    `;
  }

  setEvent() {
    const { $target } = this;
    this.addEvent('click', CLASS.BTN_DELETE_CARD, () => {
      const card = $(CLASS.CARD_CONTENTS, $target);
      card.classList.add('content-delete');
      modalShow();
    });

    this.addEvent('mouseover', CLASS.BTN_DELETE_CARD, () => {
      const card = $(CLASS.CARD_CONTENTS, $target);
      card.classList.add('content-delete-hover');
    });

    this.addEvent('mouseout', CLASS.BTN_DELETE_CARD, () => {
      const card = $(CLASS.CARD_CONTENTS, $target);
      card.classList.remove('content-delete-hover');
    });
    this.addEvent('dblclick', CLASS.CARD, ({ target }) => {
      const $card = target.closest(CLASS.CARD);
      $card.classList.add('modifying');
      new NewCard($target, {
        card: this.$state,
        reRender: this.$props.reRender,
      });
    });

    const dragEvent = new DragEvent();

    this.addEvent('mousedown', `${CLASS.CARD}:not(.modifying)`, (e) => {
      dragEvent.mouseDown(e);
    });

    this.addEvent('mouseup', CLASS.CARD, () => {
      dragEvent.mouseUp();
    });
  }
}
