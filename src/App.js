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
    new TodoListApp($todoListApp, { columns: this.$state.columns });
  }
}
