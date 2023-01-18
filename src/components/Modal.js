import {
  getDeletingCard,
  modalHide,
  revertDeletingState,
} from '../util/util.js';
import { ACTION } from '../constants.js';
import Component from '../core/Component.js';
import { TodoListStore } from '../store/TodoListStore.js';
import PropertyFinder from '../util/PropertyFinder.js';

export default class Modal extends Component {
  setup() {}

  template() {
    return `
    <div class="overlay"></div>
    <div class="modal">
      <div class="modal-text">선택한 카드를 삭제할까요?</div>
      <div class="modal-btn-container">
        <button class="btn btn-normal">취소</button>
        <button class="btn btn-accent">삭제</button>
      </div>
    </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-accent', () => {
      const deletingCard = getDeletingCard();
      const targetProperty = new PropertyFinder(deletingCard);
      const { columnIdx, cardIdx } = targetProperty.getAllProperty();
      modalHide();
      setTimeout(() => {
        TodoListStore.dispatch(ACTION.DELETE_CARD, { columnIdx, cardIdx });
      }, 300);
    });

    this.addEvent('click', '.overlay', () => {
      revertDeletingState();
      modalHide();
    });

    this.addEvent('click', '.btn-normal', () => {
      revertDeletingState();
      modalHide();
    });
  }
}
