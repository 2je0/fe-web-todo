import Component from '../core/Component.js';
import Card from './Card.js';
import NewCard from './NewCard.js';
import BUTTON from './Button.js';
import { TodoListStore } from '../store/TodoListStore.js';
import { ACTION } from '../constants.js';
export default class Column extends Component {
  setup() {}

  template() {
    const { column } = this.$props;
    const { title, cards } = column;
    return `
    <div class="todo-list-column-header-container">
      <div class="todo-list-column-left">
        <input
          class="todo-list-column-header-text"
          value="${title}"
          readonly
        />
        <div class="todo-list-column-count-container">
          <div class="todo-list-count">${cards.length}</div>
        </div>
      </div>
      <div class="todo-list-column-button-container">
        ${BUTTON.COLUMN_PLUS_BUTTON}
        ${BUTTON.COLUMN_X_BUTTON}
      </div>
    </div>
    <div class="new-card-container"></div>

    ${column.cards
      .map(() => `<div class="card-container droppable"></div>`)
      .join('')}
    <div class="droppable dummy-droppable"></div>
      
  `;
  }

  mounted() {
    const $cards = this.$target.querySelectorAll('.card-container');
    $cards.forEach(($card, idx) => {
      new Card($card, {
        columnIdx: this.$props.columnIdx,
        cardIdx: idx,
        card: this.$props.column.cards[idx],
        deleteCard: this.$props.deleteCard,
        reRender: this.render.bind(this),
        transferCard: this.$props.transferCard,
      });
    });

    const $newCard = this.$target.querySelector('.new-card-container');
    if (this.$props.column.addingState) new NewCard($newCard, {});
  }

  setEvent() {
    this.addEvent('click', '.column-btn-plus', () => {
      const { columnIdx } = this.$props;
      TodoListStore.dispatch(ACTION.TOGGLE_NEW_CARD, { columnIdx });
    });
    this.addEvent('click', '.column-btn-x', () => {
      const { columnIdx } = this.$props;
      TodoListStore.dispatch(ACTION.DELETE_COLUMN, { columnIdx });
    });
    this.addEvent('dblclick', '.todo-list-column-header-text', ({ target }) => {
      target.readOnly = false;
      target.classList.add('outline');
    });
    this.addEvent(
      'keyup',
      '.todo-list-column-header-text',
      ({ key, target }) => {
        if (key !== 'Enter') return;
        this.exitModifyColumnTitle(target);
      }
    );
    this.addEvent('focusout', '.todo-list-column-header-text', ({ target }) => {
      this.exitModifyColumnTitle(target);
    });
  }

  exitModifyColumnTitle(target) {
    const columnIdx = this.$props.columnIdx;
    target.readOnly = true;
    target.classList.remove('outline');
    TodoListStore.dispatch(ACTION.MODIFY_COLUMN_TITLE, {
      columnIdx,
      value: target.value,
    });
  }
}
