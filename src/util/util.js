import { CLASS } from '../constants.js';

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
  const modalContainer = $(CLASS.MODAL);
  modalContainer.classList.remove('modal-hidden');
};

export const modalHide = () => {
  const modalContainer = $(CLASS.MODAL);
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

export function resizeTextArea(obj) {
  obj.style.height = '14px';
  obj.style.height = obj.scrollHeight + 'px';
}

export function getNewCard() {
  return {
    title: '',
    details: [],
    footer: 'author by web',
  };
}

export function getNewColumn() {
  return {
    title: '제목 없음',
    cards: [],
    addingState: false,
  };
}

export function $(identifier, node = document.body) {
  const children = node.childNodes;
  if (isTarget(identifier, node)) return node;
  if (children.length === 0) return null;

  for (const child of children) {
    if (child.nodeType === 1 && $(identifier, child))
      return $(identifier, child);
  }
  return null;
}

export function $$(identifier, node = document.body) {
  let ret = [];
  const children = node.childNodes;
  if (isTarget(identifier, node)) ret.push(node);
  if (children.length === 0) return ret;

  for (const child of children) {
    if (child.nodeType === 1) ret = [...ret, ...$$(identifier, child)];
  }
  return ret;
}

function isTarget(identifier, node) {
  const [first] = identifier;
  if (first === '.') {
    return node.classList.contains(identifier.slice(1));
  }
  if (first === '#') {
    return node.id === identifier.slice(1);
  }
  return identifier.toUpperCase() === node.tagName;
}
