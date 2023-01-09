import {
  getCardIdxFromCard,
  getColumnIdxFromColumn,
  modalShow,
} from '../../util.js';
import Component from '../core/Component.js';

export default class Card extends Component {
  setup() {}

  template() {
    const card = this.$props.card;
    return `
    <div class="todo-list-contents-header-container">
                <div class="todo-list-contents-header-text">
                  ${card.title}
                </div>
                <button class="btn-card-x">
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
              <ul class="todo-list-contents-desc-container">
              ${card.details.map((ele) => `<li>${ele}</li>`).join('')}
              </ul>
              <div class="todo-list-contents-footer">${card.footer}</div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-card-x', (e) => {
      const card = this.$target;
      card.classList.add('content-delete');
      modalShow();
    });

    this.addEvent('mouseover', '.btn-card-x', () => {
      const card = this.$target;
      card.classList.add('content-delete2');
    });


    this.addEvent('mouseout', '.btn-card-x', () => {
      const card = this.$target;
      card.classList.remove('content-delete2');
    });
  }
}
