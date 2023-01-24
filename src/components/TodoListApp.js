import { CLASS } from '../constants.js';
import Component from '../core/Component.js';
import { TodoListStore } from '../store/TodoListStore.js';
import { $, $$ } from '../util/util.js';
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
    const { $target } = this;
    const $header = $(CLASS.HEADER, $target);
    new Header($header);

    const $columns = $$(CLASS.COLUMN, $target);
    $columns.forEach(($column, idx) => {
      new Column($column, { columnIdx: idx });
    });
  }
}
