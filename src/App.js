import Component from './core/Component.js';
import TodoListApp from './components/TodoListApp.js';
import Sidebar from './components/Sidebar.js';
import Modal from './components/Modal.js';

export default class App extends Component {
  setup() {
    this.$state = {
      columns: [],
      history: [],
    };
  }

  template() {
    return `
        <div class="todo-list-container"></div>
        <menu class="sidebar-hidden"></menu>
        <button class="fab">+</button>
        <div class="modal-container modal-hidden"></div>
    `;
  }

  mounted() {
    const $todoListApp = this.$target.querySelector('.todo-list-container');
    const $sidebar = this.$target.querySelector('menu');
    const $modal = this.$target.querySelector('.modal-container');
    new Sidebar($sidebar, { history: this.$state.history });
    new TodoListApp($todoListApp, {
      columns: this.$state.columns,
      addCard: this.addCard.bind(this),
      deleteColumn: this.deleteColumn.bind(this),
      toggleNewCard: this.toggleNewCard.bind(this),
      cancelAddingState: this.cancelAddingState.bind(this),
      modifyColumnTitle: this.modifyColumnTitle.bind(this),
      modifyCard: this.modifyCard.bind(this),
    });
    new Modal($modal, {
      deleteCard: this.deleteCard.bind(this),
    });
  }

  setEvent() {
    this.addEvent('click', '.fab', () => {
      const newColumnData = {
        title: '제목 없음',
        cards: [],
        addingState: false,
      };
      this.setState({ columns: [newColumnData, ...this.$state.columns] });
    });
  }

  toggleNewCard(columnIdx) {
    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;
    this.setState({ columns: newColumns });
  }

  addCard(columnIdx, card, cardIdx = 0) {
    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].cards.splice(cardIdx, 0, card); //unshift(card);
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;
    this.setState({ columns: newColumns });
  }
  modifyCard(columnIdx, cardIdx, newCardData) {
    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].cards.splice(cardIdx, 1, newCardData);
    this.setState({ columns: newColumns });
  }

  deleteColumn(columnIdx) {
    const newColumns = [...this.$state.columns];
    newColumns.splice(columnIdx, 1);
    this.setState({ columns: newColumns });
  }

  deleteCard(columnIdx, cardIdx) {
    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].cards.splice(cardIdx, 1);
    this.setState({ columns: newColumns });
  }

  cancelAddingState(columnIdx) {
    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;
    this.setState({ columns: newColumns });
  }

  modifyColumnTitle(columnIdx, newTitle) {
    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].title = newTitle;
    this.setState({ columns: newColumns });
  }
}
