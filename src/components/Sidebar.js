import Component from '../core/Component.js';
import History from './History.js';

export default class Sidebar extends Component {
  setup() {}

  template() {
    return `
    <div class="history-container">
      <div class="menu-button-container">
        <button id="btn-history-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
              fill="#828282"
            />
          </svg>
        </button>
      </div>
      <ul class="menu-history-container ">
      ${this.$props.historys
        .map(() => `<li class="history-item"></li>`)
        .join('')}
        ${this.$props.historys.length ? '' : '표시할 히스토리 없음!'}
      </ul>
    </div>
    `;
  }

  mounted() {
    const $historys = this.$target.querySelectorAll('.history-item');
    $historys.forEach(($history, idx) => {
      new History($history, { history: this.$props.historys[idx] });
    });
  }

  setEvent() {
    this.addEvent('click', '#btn-history-close', () => {
      const header = document.querySelector('menu');
      header.classList.add('sidebar-hidden');
    });
  }
}
