import Component from '../core/Component.js';
import BUTTON from './Button.js';

export default class Header extends Component {
  setup() {}

  template() {
    return `
    <nav class="todo-list-header-container">
      <div class="todo-list-header-text">TO-DO LIST</div>
      ${BUTTON.OPEN_SIDEBAR_BUTTON}
    </nav>
    `;
  }
  setEvent() {
    this.addEvent('click', '.todo-list-header-button', () => {
      this.showSidebar();
    });
  }

  showSidebar() {
    const header = document.querySelector('menu');
    header.classList.remove('sidebar-hidden');
  }
}
