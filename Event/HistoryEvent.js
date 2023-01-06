import { $ } from '../util.js';
const btnHistoryTab = $('.todo-list-header-button');
const menu = $('menu');

btnHistoryTab.addEventListener('click', () => {
  menu.classList.remove('sidebar-hidden');
});
const btnHistoryClose = $('#btn-history-close');
btnHistoryClose.addEventListener('click', () => {
  menu.classList.add('sidebar-hidden');
});
