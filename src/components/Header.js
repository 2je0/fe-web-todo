import Component from '../core/Component.js';

export default class Header extends Component {
  setup() {}

  template() {
    return `
    <nav class="todo-list-header-container">
          <div class="todo-list-header-text">TO-DO LIST</div>
          <button class="todo-list-header-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="11"
              viewBox="0 0 17 11"
              fill="none"
            >
              <path
                d="M0 1V3.8147e-06H17V1H0ZM17 5V6H0V5H17ZM0 10H17V11H0V10Z"
                fill="#010101"
              />
            </svg>
          </button>
        </nav>
    `;
  }
  setEvent() {
    this.addEvent('click', '.todo-list-header-button', () => {
      const header = document.querySelector('menu');
      header.classList.remove('sidebar-hidden');
    });
  }
}
