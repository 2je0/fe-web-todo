import Component from '../core/Component.js';
import PropertyFinder from '../util/PropertyFinder.js';
import Card from './Card.js';
import NewCard from './NewCard.js';

export default class Column extends Component {
  setup() {}

  template() {
    const column = this.$props.column;
    return `
    <div class="todo-list-column-header-container">
    <div class="todo-list-column-left">
      <input class="todo-list-column-header-text" value=${
        column.title
      } readonly>
      <div class="todo-list-column-count-container">
        <div class="todo-list-count">${column.cards.length}</div>
      </div>
    </div>
    <div class="todo-list-column-button-container">
      <button class="column-btn column-btn-plus">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M0.105713 7.53033L0.105713 6.46967H6.46967V0.105713H7.53033V6.46967H13.8943V7.53033H7.53033V13.8943H6.46967V7.53033H0.105713Z"
            fill="#BDBDBD"
          />
        </svg>
      </button>
      <button class="column-btn column-btn-x">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
            fill="#BDBDBD"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="new-card-container"></div>
  
  ${column.cards
    .map(() => `<div class="card-container" draggable="true"></div>`)
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
