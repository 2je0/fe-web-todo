import { $ } from '../utils/utils.js';

export function initializeModal() {
  const $main = $('#main');
  const $modalTemplate = $('.todo_plus_modal');
  const $modal = document.importNode($modalTemplate.content, true);
  $main.appendChild($modal);
  attachModalEvent();
}

function attachModalEvent() {
  const $btnModalClose = $('#modal_close');
  $btnModalClose.addEventListener('click', () => {
    const $modal = $('#modal');
    $modal.classList.add('hidden');
  });
  const $btnAddColumn = $('#modal_plus');
  $btnAddColumn.addEventListener('click', addColumn);
}

function addColumn() {
  const plus_item_name = document.getElementById('item_plus_name').value;
  columnArray.pushColumn(new columnElement(plus_item_name));

  const columnJSONBody = {
    name: plus_item_name,
  };
  fetchPost('column', columnJSONBody);

  let input_card_index = columnArray.returnLength() - 1;
  initializeColumn(input_card_index);
  let item_plus =
    document.getElementsByClassName('button_plus')[input_card_index];
  item_plus.addEventListener('click', function (event) {
    insertCardDom(input_card_index);
  });
  const $modal = $('#modal');
  $modal.classList.add('hidden');
}
