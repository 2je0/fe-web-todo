import { makeLog } from '../utils/logutils.js';
import {
  fetchPost,
  fetchDelete,
  fetchPut,
  getJSONData,
} from '../utils/fetchUtils.js';
import {
  addCard,
  insertCardDomEventListenerCancel,
  FixCardElement,
} from './CardView.js';
import { cardArray, cardElement } from '../dataStorage.js';

//수정버튼 -> 취소버튼
function fixCardDomEventListenerCancel(buttonContainer, currentCard) {
  currentCard.style.display = '';
  buttonContainer.remove();
}

//수정버튼 -> 하늘색 수정버튼
function fixCardDomEventListener(buttonContainer, currentCard) {
  let [fixCardTitle] = buttonContainer.getElementsByClassName('input_title');
  let [fixCardTag] = buttonContainer.getElementsByClassName('input_context');
  let beforeCardName =
    currentCard.getElementsByClassName('item_name')[0].innerHTML;
  if (fixCardTitle.value && fixCardTag.value) {
    let beforeCardIdx = cardArray.findIdxByName(beforeCardName);
    let beforeCardStatus = cardArray.getcard()[beforeCardIdx].status;

    let bodyData = {
      name: fixCardTitle.value,
      tag: fixCardTag.value,
      status: beforeCardStatus,
    };
    let nowDate = new Date();
    const newStorage = cardArray.getcard()[beforeCardIdx];
    cardArray.fixcard(
      beforeCardIdx,
      new cardElement(
        fixCardTitle.value,
        fixCardTag.value,
        nowDate,
        beforeCardStatus,
        newStorage.storageId
      )
    );
    makeLog('update', newStorage.name, newStorage.date, newStorage.status, '');

    fetchPost('log', {
      functionName: 'update',
      cardName: fixCardTitle.value,
      logDate: nowDate,
      cardFrom: beforeCardStatus,
    });

    fetchPut('card', newStorage.storageId, bodyData).then(function () {
      currentCard.getElementsByClassName('item_name')[0].innerHTML =
        fixCardTitle.value;
      currentCard.getElementsByClassName('item_tag')[0].value =
        fixCardTag.value;
    });
  }

  buttonContainer.remove();
  currentCard.style.display = '';
}

function cardDeleteButtonEventListener(
  cardModalItself,
  currentCard,
  current_item_status
) {
  cardModalItself.style.display = 'none';
  let name = currentCard.getElementsByClassName('item_name')[0].innerHTML;
  cardArray.getcard().forEach((element, index) => {
    if (name == element.name) {
      fetchPost('log', {
        functionName: 'delete',
        cardName: element.name,
        logDate: new Date(),
        cardFrom: element.status,
      });
      makeLog('delete', element.name, element.date, element.storage, '');
      fetchDelete('card', element.storageId);
      cardArray.deletecard(index);
      return;
    }
  });
  //innerCircleCount(getColumnIdxbyCardIdx(idx));
  currentCard.remove();
}

function cardDeleteButtonCancelEventListener(cardModalItself) {
  cardModalItself.style.display = 'none';
}

function insertCardDomEventListener(
  cardIdx,
  inputtext1,
  inputtext2,
  buttonContainer
) {
  const current_date = new Date();

  let [columnIdx] =
    buttonContainer.parentNode.getElementsByClassName('list_name');
  if (inputtext1.value !== '') {
    makeLog('add', inputtext1.value, current_date, columnIdx.innerHTML, '', '');

    fetchPost('log', {
      functionName: 'add',
      cardName: inputtext1.value,
      logDate: current_date,
      cardFrom: columnIdx.innerHTML,
    });

    fetchPost('card', {
      name: inputtext1.value,
      tag: inputtext2.value,
      status: columnIdx.innerHTML,
    }).then(function () {
      getJSONData('card').then((data) => {
        data.forEach((element, index) => {
          if (index == data.length - 1) {
            let insertCardDomObject = new cardElement(
              element.name,
              element.tag,
              current_date,
              element.status,
              element.id
            );
            cardArray.pushcard(insertCardDomObject);
            addCard(insertCardDomObject);
          }
        });
      });
    });
  }
  buttonContainer.remove();
}

function eraseCardXButtonHoverAndEventHandler(
  eraseCardXButton,
  currentCard,
  currentCardTag
) {
  eraseCardXButton.addEventListener('mouseover', (event) => {
    currentCard.classList.add('card_hover');
    currentCardTag.classList.add('card_tag_hover');
  });
  eraseCardXButton.addEventListener('mouseout', (event) => {
    currentCard.classList.remove('card_hover');
    currentCardTag.classList.remove('card_tag_hover');
  });
  eraseCardXButton.addEventListener('click', (event) => {
    currentCard.getElementsByClassName(
      'card_modal_background'
    )[0].style.display = '';
  });
}

function fixCardButtonEventHandler(fixCardButton, currentCard) {
  fixCardButton.addEventListener('click', (event) => {
    const fixCardNode = FixCardElement(currentCard);
    currentCard.parentNode.appendChild(fixCardNode);
    currentCard.style.display = 'none';
  });
}

export {
  fixCardDomEventListenerCancel,
  fixCardDomEventListener,
  insertCardDomEventListenerCancel,
  cardDeleteButtonEventListener,
  cardDeleteButtonCancelEventListener,
  insertCardDomEventListener,
  eraseCardXButtonHoverAndEventHandler,
  fixCardButtonEventHandler,
};
