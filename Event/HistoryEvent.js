import { $ } from '../util.js';
const btnHistoryTab = $('.todo-list-header-button');
const btnHistoryClose = $('#btn-history-close');
const menu = $('menu');

export const historyTabEventHandler = () => {
  btnHistoryTab.addEventListener('click', () => {
    menu.classList.remove('sidebar-hidden');
  });

  btnHistoryClose.addEventListener('click', () => {
    menu.classList.add('sidebar-hidden');
  });
};
