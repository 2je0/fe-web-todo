Object.prototype.insertAfter = function (newNode) {
  if (!!this.nextSibling) {
    this.parentNode.insertBefore(newNode, this.nextSibling);
  } else {
    this.parentNode.appendChild(newNode);
  }
};
Object.prototype.exchangeNode = function (node) {
  this.insertAfter(node);
  this.remove();
};
export const $ = (select) => document.querySelector(select);
export const $All = (select) => document.querySelectorAll(select);

export const getColumnIdxFromCard = (cardComponent) => {
  const columnComponent = cardComponent.closest('.todo-list-column-container');
  return getColumnIdxFromColumn(columnComponent);
};

export const getColumnIdxFromColumn = (columnComponent) => {
  const columnComponents = document.querySelectorAll(
    '.todo-list-column-container'
  );
  return nthChild(columnComponents, columnComponent);
};

export const getCardIdxFromCard = (cardComponent) => {
  const columnComponent = cardComponent.closest('.todo-list-column-container');
  const cardComponents = columnComponent.querySelectorAll(
    '.todo-list-contents-container:not(.content-new)'
  );
  return nthChild(cardComponents, cardComponent);
};

export const nthChild = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
};

export const modalShow = () => {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.remove('modal-hidden');
};

export const modalHide = () => {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.add('modal-hidden');
};

export const getDeletingCard = () => {
  const card = $('.content-delete');
  return card;
};

export const revertDeletingState = () => {
  const deletingCard = getDeletingCard();
  if (!deletingCard) return;
  deletingCard.classList.remove('content-delete');
};
