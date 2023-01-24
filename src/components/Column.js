import Component from '../core/Component.js';
import Card from './Card.js';
import NewCard from './NewCard.js';
import BUTTON from './Button.js';
import { TodoListStore } from '../store/TodoListStore.js';
import { ACTION, CLASS } from '../constants.js';
import { $, $$ } from '../util/util.js';
export default class Column extends Component {
  setup() {
    const { columns } = TodoListStore.getState();
    this.$state = columns[this.$props.columnIdx];
  }

  template() {
    const column = this.$state;
    if (!column) return '<div>로딩중...</div>';
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
    const { $target, $props, $state } = this;
    const $cards = $$(CLASS.CARD, $target);
    $cards.forEach(($card, idx) => {
      new Card($card, {
        columnIdx: $props.columnIdx,
        cardIdx: idx,
        reRender: this.render.bind(this),
      });
    });

    const $newCard = $(CLASS.NEWCARD, $target);
    if ($state.addingState) new NewCard($newCard, {});
  }

  setEvent() {
    this.addEvent('click', CLASS.BTN_NEWCARD, () => {
      const { columnIdx } = this.$props;
      TodoListStore.dispatch(ACTION.TOGGLE_NEW_CARD, { columnIdx });
    });

    this.addEvent('click', CLASS.BTN_DELETE_COLUMN, () => {
      const { columnIdx } = this.$props;
      TodoListStore.dispatch(ACTION.DELETE_COLUMN, { columnIdx });
    });

    this.addEvent('dblclick', CLASS.COLUMN_TITLE, ({ target }) => {
      target.readOnly = false;
      target.classList.add('outline');
    });

    this.addEvent('keyup', CLASS.COLUMN_TITLE, ({ key, target }) => {
      if (key !== 'Enter') return;
      this.exitModifyColumnTitle(target);
    });

    this.addEvent('focusout', CLASS.COLUMN_TITLE, ({ target }) => {
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
