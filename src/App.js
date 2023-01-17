import Component from './core/Component.js';
import TodoListApp from './components/TodoListApp.js';
import Sidebar from './components/Sidebar.js';
import Modal from './components/Modal.js';
import { addNewColumnToServer, getServerData } from './util/fetchUtil.js';
import { TodoListStore } from './store/TodoListStore.js';

export default class App extends Component {
  setup() {
    getServerData(this.setState.bind(this)).then((data) => {
      TodoListStore.dispatch('INIT_DATA', data);
    });
    TodoListStore.subscribe(() => {
      this.render();
      this.setEvent();
    });
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
    });
    new Modal($modal);
  }

  setEvent() {
    this.addEvent('click', '.fab', () => {
      addNewColumnToServer().then(getServerData(this.setState.bind(this)));
    });
  }
}
