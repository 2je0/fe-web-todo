import { State } from './store.js';
import { addNewColumn } from './View/ColumnView.js';
import { modalHide } from './Components/Modal.js';
import { getDeletingCard, revertDeletingState } from './Components/Card.js';
import { getCardIdxFromCard, getColumnIdxFromCard, $ } from './util.js';

const state = new State();

//column 늘리기
const btnFAB = $('.fab');
btnFAB.addEventListener('click', addNewColumn.bind(null, state));

//modal eventListener
const overlay = $('.overlay');
overlay.addEventListener('click', () => {
  modalHide();
  revertDeletingState();
});

const btnModalDeleteCancel = $('.modal-container').querySelector('.btn-normal');
btnModalDeleteCancel.addEventListener('click', () => {
  modalHide();
  revertDeletingState();
});

const btnModalDeleteAccent = $('.modal-container').querySelector('.btn-accent');
btnModalDeleteAccent.addEventListener('click', () => {
  const deletingCard = getDeletingCard();
  const columnIdx = getColumnIdxFromCard(deletingCard);
  const cardIdx = getCardIdxFromCard(deletingCard);
  deletingCard.remove();
  state.deleteCard(columnIdx, cardIdx);
  modalHide();
});

// updateToDoListUI(state);
