import Component from './core/Component.js';
import TodoListApp from './components/TodoListApp.js';
import Sidebar from './components/Sidebar.js';

const dummyCard = {
  title: 'gitHub 공부하기',
  details: ['gitbub 공부내용', 'gitbub 공부내용'],
  footer: 'author by web',
};

const dummyColumn = {
  title: '해야할 일',
  cards: [dummyCard, dummyCard],
  addingState: false,
};

const dummyState = {
  columns: [dummyColumn],
  history: [],
};

export default class App extends Component {
  setup() {
    this.$state = {
      columns: [
        {
          title: '제목 없음',
          cards: [dummyCard, dummyCard],
          addingState: false,
        },
        {
          title: '제목 없음',
          cards: [],
          addingState: false,
        },
      ],
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

    new Sidebar($sidebar, { history: this.$state.history });
    new TodoListApp($todoListApp, {
      columns: this.$state.columns,
      addCard: this.addCard.bind(this),
      deleteCard: this.deleteCard.bind(this),
      deleteColumn: this.deleteColumn.bind(this),
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

  addCard(columnIdx, card) {
    const newColumn = [...this.$state.columns];
    newColumn[columnIdx].cards.unshift(card);
    this.setState({ columns: newColumn });
  }

  deleteColumn(columnIdx) {
    const newColumn = [...this.$state.columns];
    newColumn.splice(columnIdx, 1);
    this.setState({ columns: newColumn });
  }

  deleteCard(columnIdx, cardIdx) {
    const newColumn = [...this.$state.columns];
    newColumn[columnIdx].cards.splice(cardIdx, 1);
    this.setState({ columns: newColumn });
  }
}
