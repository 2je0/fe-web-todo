import Component from '../core/Component.js';
import PropertyFinder from '../util/PropertyFinder.js';
import Card from './Card.js';
import NewCard from './NewCard.js';
import BUTTON from './Button.js';
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
  `;
  }

  mounted() {
    const $cards = this.$target.querySelectorAll('.card-container');
    $cards.forEach(($card, idx) => {
      new Card($card, {
        card: this.$props.column.cards[idx],
        deleteCard: this.$props.deleteCard,
        addCard: this.$props.addCard,
        modifyCard: this.$props.modifyCard,
        reRender: this.render.bind(this),
        transferCard: this.$props.transferCard,
      });
    });

    const $newCard = this.$target.querySelector('.new-card-container');
    if (this.$props.column.addingState)
      new NewCard($newCard, {
        addCard: this.$props.addCard,
        cancelAddingState: this.$props.cancelAddingState,
      });
  }

  setEvent() {
    this.addEvent('click', '.column-btn-plus', ({ target }) => {
      const targetProperty = new PropertyFinder(target);
      const columnIdx = targetProperty.getColumnIdx();
      this.$props.toggleNewCard(columnIdx);
    });
    this.addEvent('click', '.column-btn-x', ({ target }) => {
      const targetProperty = new PropertyFinder(target);
      const columnIdx = targetProperty.getColumnIdx();
      this.$props.deleteColumn(columnIdx);
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
    const targetProperty = new PropertyFinder(target);
    target.readOnly = true;
    target.classList.remove('outline');
    const columnIdx = targetProperty.getColumnIdx();
    this.$props.modifyColumnTitle(columnIdx, target.value);
  }
}
