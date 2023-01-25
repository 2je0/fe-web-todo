import { $ } from '../utils/utils.js';

function initializeSidebar() {
  const $sideBarTemplate = $('.animated_layer');
  const $sidebarClone = document.importNode($sideBarTemplate.content, true);
  document.body.appendChild($sidebarClone);
  const $sidebar = $('.sidebarOn');
  const $btnCloseSidebar = $('.button_x_card');
  $btnCloseSidebar.addEventListener('click', () => {
    $sidebar.classList.add('hidden');
  });
  addSidebar();
}

function addSidebar() {
  const $btnOpenSidebar = $('.hamburger');
  const $sidebar = $('.sidebarOn');

  $btnOpenSidebar.addEventListener('click', () => {
    $sidebar.classList.remove('hidden');
  });
}

export { initializeSidebar };
