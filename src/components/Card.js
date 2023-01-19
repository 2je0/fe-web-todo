import { modalShow } from '../util/util.js';
import Component from '../core/Component.js';
import DragEvent from '../event/DragEvent.js';
import { TodoListStore } from '../store/TodoListStore.js';
import BUTTON from './Button.js';
import NewCard from './NewCard.js';

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
    this.addEvent('click', '.btn-card-x', () => {
      const card = this.$target.querySelector('.todo-list-contents-container');
      card.classList.add('content-delete');
      modalShow();
    });

    this.addEvent('mouseover', '.btn-card-x', () => {
      const card = this.$target.querySelector('.todo-list-contents-container');
      card.classList.add('content-delete-hover');
    });

    this.addEvent('mouseout', '.btn-card-x', () => {
      const card = this.$target.querySelector('.todo-list-contents-container');
      card.classList.remove('content-delete-hover');
    });
    this.addEvent('dblclick', '.card-container', ({ target }) => {
      const $card = target.closest('.card-container');
      $card.classList.add('modifying');
      new NewCard(this.$target, {
        card: this.$state,
        reRender: this.$props.reRender,
      });
    });

    const dragEvent = new DragEvent();

    this.addEvent('mousedown', '.card-container:not(.modifying)', (e) => {
      dragEvent.mouseDown(e);
    });

    this.addEvent('mouseup', '.card-container', () => {
      dragEvent.mouseUp();
    });
  }
}
