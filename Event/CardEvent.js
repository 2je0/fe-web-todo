import {
  getCardComponent,
  getCardData,
  cardCountingUpdate,
} from '../Components/Card.js';
import { modalShow } from '../Components/Modal.js';

export const attachNewCardEvent = (newCardComponent, state, idx) => {
  const btnCancel = newCardComponent.querySelector('.btn-normal');
  const btnAccent = newCardComponent.querySelector('.btn-accent');

  btnCancel.addEventListener('click', () => {
    newCardComponent.remove();
    state.toggleAddingState(idx);
  });

  btnAccent.addEventListener('click', () => {
    const title = newCardComponent.querySelector(
      '.todo-list-contents-header-text'
    ).value;
    const details = newCardComponent.querySelector(
      '.todo-list-contents-desc-container'
    ).value;
    const cardData = getCardData(title, details);
    const cardComponent = getCardComponent(cardData);
    attachCardEvent(cardComponent);
    newCardComponent.exchangeNode(cardComponent);

    state.toggleAddingState(idx);
    state.addCardData(idx, cardData);

    cardCountingUpdate(state, idx);
  });
};

const attachCardEvent = (cardComponent) => {
  const btnCancel = cardComponent.querySelector('.btn-card-x');

  btnCancel.addEventListener('click', () => {
    cardComponent.classList.add('content-delete');
    modalShow();
  });
};
