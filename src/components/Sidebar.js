import Component from '../core/Component.js';
import { TodoListStore } from '../store/TodoListStore.js';
import BUTTON from './Button.js';
import History from './History.js';
import { $$, $ } from '../util/util.js';
import { CLASS } from '../constants.js';
export default class Sidebar extends Component {
  setup() {
    const { historys } = TodoListStore.getState();
    const sortedHistorys = [...historys].sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return bDate - aDate;
    });
    this.$state = sortedHistorys;
  }

  template() {
    return `
    <div class="history-container">
      <div class="menu-button-container">
        <button id="btn-history-close">
          ${BUTTON.CLOSE_SIDEBAR_BUTTON}
        </button>
      </div>
      <ul class="menu-history-container ">
      ${this.$state.map(() => `<li class="history-item"></li>`).join('')}
        ${this.$state.length ? '' : '표시할 히스토리 없음!'}
      </ul>
    </div>
    `;
  }

  mounted() {
    const $historys = $$(CLASS.HISTORY, this.$target);
    $historys.forEach(($history, idx) => {
      new History($history, { history: this.$state[idx] });
    });
  }

  setEvent() {
    this.addEvent('click', CLASS.BTN_CLOSE_SIDEBAR, () => {
      const header = $(CLASS.SIDE_BAR);
      header.classList.add('sidebar-hidden');
    });
  }
}
