import { columnElement, columnArray } from '../dataStorage.js';
import { insertCardDom } from '../card/CardView.js';
import { $, innerCircleCount } from '../utils/utils.js';
import { fetchPost, fetchPut } from '../utils/fetchUtils.js';

function initializeModal() {
  const $main = $('#main');
  const $modalTemplate = $('.todo_plus_modal');
  const $modal = document.importNode($modalTemplate.content, true);
  $main.appendChild($modal);
  attachModalEvent();
}

function initializeColumn(i) {
  let mainLocation = document.getElementById('main');
  let columnUnit = makeColumnUnit();
  let cardLayout = makeCardLayout();

  columnUnit.appendChild(cardLayout);

  let columnInputName = columnArray.getColumn()[i].name;
  let [columnNameLocation] = columnUnit.getElementsByClassName('list_name');
  changeColumnNameEventHandler(columnNameLocation, i, columnInputName);
  mainLocation.appendChild(columnUnit);
  document.getElementsByClassName('list_name')[i].innerHTML = columnInputName;

  innerCircleCount(i);
}

function makeColumnUnit() {
  let columnUnit = document.createElement('div');
  let [columnTemplates] = document.getElementsByClassName('template_list');
  let columnInputThing = document.importNode(columnTemplates.content, true);
  columnUnit.appendChild(columnInputThing);
  columnUnit.setAttribute('class', 'addCard_here');
  return columnUnit;
}

function makeCardLayout() {
  let cardLayout = document.createElement('div');
  cardLayout.setAttribute('class', 'cardLayout');
  return cardLayout;
}

//우측 하단 + 이벤트리스너
function attachFabEvent() {
  const $fab = $('#plus_list');
  $fab.addEventListener('click', () => {
    const $modal = $('#modal');
    $modal.classList.remove('hidden');
  });
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

function attachModalEvent() {
  const $btnModalClose = $('#modal_close');
  $btnModalClose.addEventListener('click', () => {
    const $modal = $('#modal');
    $modal.classList.add('hidden');
  });
  const $btnAddColumn = $('#modal_plus');
  $btnAddColumn.addEventListener('click', addColumn);
}

function changeColumnNameEventHandler(columnNameLocation, i, input_name) {
  columnNameLocation.addEventListener('dblclick', function (event) {
    if (columnNameLocation.value != input_name) {
      columnArray.getColumn()[i].setName(columnNameLocation.value);
      fetchPut('column', i + 1, {
        name: columnNameLocation.value,
      });
    }
  });
}

export { initializeModal, initializeColumn, attachFabEvent };
