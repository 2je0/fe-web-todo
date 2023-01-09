import Component from '../core/Component.js';
import Header from './Header.js';
export default class App extends Component {
  setup() {}

  template() {
    return `
    <nav class="todo-list-header-container"></nav>
    <main class="todo-list-body-container"></main>
    `;
  }

  mounted() {
    const $header = this.$target.querySelector('.todo-list-header-container');
    new Header($header);
  }
}
