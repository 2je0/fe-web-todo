import { initializeSidebar } from './Sidebar/AnimatedLayer.js';
import { addCard, insertCardDom } from './card/CardView.js';
import { initializeColumn, attachFabEvent } from './column/ColumnView.js';
import {
  columnElement,
  cardElement,
  columnArray,
  cardArray,
  logElement,
  logArray,
} from './dataStorage.js';
import { fetchDelete, getJSONData } from './utils/fetchUtils.js';
import { insertHistory } from './utils/logutils.js';

function loadingData() {
  getJSONData('column').then((data) => {
    data.forEach((_, index) => {
      const new_column = new columnElement(data[index].name, data[index].id);
      columnArray.pushColumn(new_column);
    });

    getJSONData('card').then((data) => {
      data.forEach((_, index) => {
        const nowDate = new Date();
        const new_card = new cardElement(
          data[index].name,
          data[index].tag,
          nowDate,
          data[index].status,
          data[index].id
        );
        cardArray.pushcard(new_card);
      });

      cardArray.getcard().forEach((element) => {
        addCard(element);
      });
    });

    columnArray.getColumn().forEach((_, index) => {
      initializeColumn(index);
    });

    initializeSidebar();
    attachFabEvent();
    columnPlus();
    columnDelete();
  });
}

function loadingLog() {
  getJSONData('log').then((data) => {
    data.forEach((element) => {
      const newLog = new logElement(
        element.functionName,
        element.cardName,
        element.logDate,
        element.cardFrom,
        element.cardTo,
        element.storageId
      );
      logArray.pushLogArray(newLog);
      insertHistory(newLog);
    });
  });
}

//column 추가 버튼
function columnPlus() {
  let columnPlus = document.getElementsByClassName('button_plus');

  columnArray.getColumn().forEach((element, index) => {
    columnPlus[index].addEventListener('click', function (event) {
      insertCardDom(index);
    });
  });
}

//column 삭제 버튼
function columnDelete() {
  let columnDelete = document.getElementsByClassName('button_x_column');

  columnArray.getColumn().forEach((element, index) => {
    columnDelete[index].addEventListener('dblclick', function (event) {
      deleteColumn(index);
    });
  });
}

function deleteColumn(idx) {
  let columnLayer = document.getElementsByClassName('addCard_here');

  const cardsInDeleteColumn =
    columnLayer[idx].getElementsByClassName('item_name');
  cardsInDeleteColumn.forEach((data) => {
    fetchDelete('card', cardArray.returnStorageIdByName(data.innerHTML));
  });
  columnLayer[idx].style.display = 'none';
  fetchDelete('column', columnArray.getColumn()[idx].storageId);
}

export { loadingData, loadingLog, columnPlus, columnDelete, deleteColumn };
