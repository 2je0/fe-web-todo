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

export const modalShow = () => {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.remove('modal-hidden');
};

export const modalHide = () => {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.add('modal-hidden');
};

export const getDeletingCard = () => {
  const card = document.querySelector('.content-delete');
  return card;
};

export const revertDeletingState = () => {
  const deletingCard = getDeletingCard();
  if (!deletingCard) return;
  deletingCard.classList.remove('content-delete');
};
