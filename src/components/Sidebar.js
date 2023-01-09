import Component from '../core/Component.js';

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
          <ul >
            <li>
              <img src="./asset/user-img.svg" />
              <div class="history-content-container">
                <div class="history-content-id">@sam</div>
                <div class="history-content-desc">
                  HTML/CSS공부하기를 해야할 일에서 하고 있는 일로
                  이동하였습니다.
                </div>
                <div class="history-content-time">1분 전</div>
              </div>
            </li>
          </ul>
        </div>
    `;
  }

  mounted() {}

  setEvent() {
    this.addEvent('click', '#btn-history-close', () => {
      const header = document.querySelector('menu');
      header.classList.add('sidebar-hidden');
    });
  }
}
