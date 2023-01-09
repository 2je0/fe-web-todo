import {
  getCardIdxFromCard,
  getColumnIdxFromCard,
  getDeletingCard,
  modalHide,
  revertDeletingState,
} from '../../util.js';
import Component from '../core/Component.js';

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
      const columnIdx = getColumnIdxFromCard(deletingCard);
      const cardIdx = getCardIdxFromCard(deletingCard);
      this.$props.deleteCard(columnIdx, cardIdx);
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
