import {
  getDeletingCard,
  revertDeletingState,
  deleteCardDataInState,
} from '../Components/Card.js';
import { modalHide } from '../Components/Modal.js';
import { $ } from '../util.js';

const overlay = $('.overlay');
const btnModalDeleteAccent = $('.modal-container').querySelector('.btn-accent');
const btnModalDeleteCancel = $('.modal-container').querySelector('.btn-normal');

export const modalEventHandler = (state) => {
  overlay.addEventListener('click', () => {
    modalHide();
    revertDeletingState();
  });

  btnModalDeleteCancel.addEventListener('click', () => {
    modalHide();
    revertDeletingState();
  });

  btnModalDeleteAccent.addEventListener('click', () => {
    const deletingCard = getDeletingCard();
    deleteCardDataInState(deletingCard, state);
    deletingCard.remove();
    modalHide();
  });
};
