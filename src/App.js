import Component from './core/Component.js';
import TodoListApp from './components/TodoListApp.js';
import Sidebar from './components/Sidebar.js';
import Modal from './components/Modal.js';
import { TodoListStore } from './store/TodoListStore.js';
import { ACTION } from './constants.js';

export default class App extends Component {
  setup() {
    TodoListStore.dispatch(ACTION.INIT_DATA);
    TodoListStore.subscribe(this.render.bind(this));
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
    new Sidebar($sidebar);
    new TodoListApp($todoListApp);
    new Modal($modal);
  }

  setEvent() {
    this.addEvent('click', '.fab', () => {
      TodoListStore.dispatch(ACTION.ADD_COLUMN);
    });
  }
}
