import Component from '../core/Component.js';
import { TodoListStore } from '../store/TodoListStore.js';
import Column from './Column.js';
import Header from './Header.js';
export default class TodoListApp extends Component {
  template() {
    const { columns } = TodoListStore.getState();
    return `
    <nav class="todo-list-header-container"></nav>
    <main class="todo-list-body-container">${columns
      .map(() => `<div class="todo-list-column-container"></div>`)
      .join('')}
    </main>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('.todo-list-header-container');
    new Header($header);

    const $columns = this.$target.querySelectorAll(
      '.todo-list-column-container'
    );
    $columns.forEach(($column, idx) => {
      new Column($column, { columnIdx: idx });
    });
  }
}
