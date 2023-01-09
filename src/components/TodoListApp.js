import Component from '../core/Component.js';
import Card from './Card.js';
import Column from './Column.js';
import Header from './Header.js';
export default class TodoListApp extends Component {
  setup() {}

  template() {
    return `
    <nav class="todo-list-header-container"></nav>
    <main class="todo-list-body-container">${this.$props.columns
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
      new Column($column, { column: this.$props.columns[idx] });
    });
  }
}
