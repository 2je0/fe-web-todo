import { CLASS } from '../constants.js';
import Component from '../core/Component.js';
import { $ } from '../util/util.js';
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
    this.addEvent('click', CLASS.BTN_OPEN_SIDEBAR, () => {
      this.showSidebar();
    });
  }

  showSidebar() {
    const header = $(CLASS.SIDE_BAR);
    header.classList.remove('sidebar-hidden');
  }
}
