const modalContainer = document.querySelector('.modal-container');
export const modalShow = () => {
  modalContainer.classList.remove('modal-hidden');
};

export const modalHide = () => {
  modalContainer.classList.add('modal-hidden');
};
