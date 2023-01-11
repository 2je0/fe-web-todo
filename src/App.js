import Component from './core/Component.js';
import TodoListApp from './components/TodoListApp.js';
import Sidebar from './components/Sidebar.js';
import Modal from './components/Modal.js';

export default class App extends Component {
  setup() {
    this.$state = {
      columns: [],
      historys: [
        // {
        //   imgUrl: './asset/user-img.svg',
        //   userId: 'sam',
        //   createdAt: '2022-1-11',
        //   initialState: '해야할 일',
        //   finalState: '하고 있는 일',
        //   actionType: '이동',
        //   task: 'HTML/CSS공부하기',
        // },
        // {
        //   imgUrl: './asset/user-img.svg',
        //   userId: 'sam',
        //   createdAt: '2022-1-11',
        //   initialState: '해야할 일',
        //   finalState: '하고 있는 일',
        //   actionType: '이동',
        //   task: 'HTML/CSS공부하기',
        // },
      ],
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
    new Sidebar($sidebar, { historys: this.$state.historys });
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
    const newHistorys = [...this.$state.historys];
    const newHistory = {
      imgUrl: './asset/user-img.svg',
      userId: 'sam',
      createdAt: new Date(),
      finalState: this.$state.columns[columnIdx].title,
      actionType: '등록',
      task: card.title,
    };
    newHistorys.unshift(newHistory);

    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].cards.splice(cardIdx, 0, card); //unshift(card);
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;
    this.setState({ columns: newColumns, historys: newHistorys });
  }
  modifyCard(columnIdx, cardIdx, newCardData) {
    const newHistorys = [...this.$state.historys];
    const newHistory = {
      imgUrl: './asset/user-img.svg',
      userId: 'sam',
      createdAt: new Date(),
      initialState: newCardData.title,
      finalState: this.$state.columns[columnIdx].cards[cardIdx].title,
      actionType: '변경',
    };
    newHistorys.unshift(newHistory);

    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].cards.splice(cardIdx, 1, newCardData);
    this.setState({ columns: newColumns, historys: newHistorys });
  }

  deleteColumn(columnIdx) {
    const newColumns = [...this.$state.columns];
    newColumns.splice(columnIdx, 1);
    this.setState({ columns: newColumns });
  }

  deleteCard(columnIdx, cardIdx) {
    const newHistorys = [...this.$state.historys];
    const newHistory = {
      imgUrl: './asset/user-img.svg',
      userId: 'sam',
      createdAt: new Date(),
      finalState: this.$state.columns[columnIdx].title,
      task: this.$state.columns[columnIdx].cards[cardIdx].title,
      actionType: '삭제',
    };
    newHistorys.unshift(newHistory);

    const newColumns = [...this.$state.columns];
    newColumns[columnIdx].cards.splice(cardIdx, 1);
    this.setState({ columns: newColumns, historys: newHistorys });
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
