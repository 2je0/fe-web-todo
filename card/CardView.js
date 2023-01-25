import {
  columnElement,
  cardElement,
  columnArray,
  cardArray,
  logArray,
} from "../dataStorage.js";
import { innerCircleCount } from "../utils/utils.js";

import {
  fixCardDomEventListenerCancel,
  fixCardDomEventListener,
  cardDeleteButtonEventListener,
  cardDeleteButtonCancelEventListener,
  insertCardDomEventListener,
  eraseCardXButtonHoverAndEventHandler,
  fixCardButtonEventHandler,
} from "./CardViewEvent.js"

HTMLCollection.prototype.forEach = Array.prototype.forEach;

let cardAddButtonFlag = false;
let cardPlusButtonInsertPlace = document.getElementsByName("todo_thing");

//카드 추가의 메인!
function addCard(element) {
  let inputCardArray = element; // card_element

  //card는 ul리스트의 한 단위이고, currentCard는 ul 안의 div이다.

  let currentCardIdx = cardArray.findIdxByName(element.name); //list 배열의 번호
  let card = makeCardElement(currentCardIdx, inputCardArray);
  let [eraseCardXButton] = card.getElementsByClassName("button_x_card");
  let currentCard = eraseCardXButton.parentNode.parentNode.parentNode;
  let [currentCardTag] = currentCard.getElementsByClassName("item_tag");
  let [fixCardButton] = card.getElementsByClassName("card_fix");

  fixCardButtonEventHandler(fixCardButton, currentCard);
  eraseCardXButtonHoverAndEventHandler(
    eraseCardXButton,
    currentCard,
    currentCardTag
  );
  initCardDeleteModal(currentCard, currentCardIdx);
  innerCircleCount(getColumnIdxbyCardIdx(currentCardIdx));
}

function makeCardElement(currentCardIdx, inputCardArray) {
  let initialize_location = document.getElementsByClassName("cardLayout"); //list 배열
  let card = document.createElement("div");
  let [templates] = document.getElementsByClassName("template_item");
  let input_name = inputCardArray.name;
  let input_tag = inputCardArray.tag;
  let input_thing = document.importNode(templates.content, true);

  card.appendChild(input_thing);
  
  let currentColumnIdx = getColumnIdxbyCardIdx(currentCardIdx)
  initialize_location[currentColumnIdx].prepend(card);
  card.getElementsByClassName("item_name")[0].innerHTML = input_name;
  card.getElementsByClassName("item_tag")[0].innerHTML = input_tag;

  return card;
}

function insertCardElementText(insertTitleholderText, insertSetClassText) {
  let inputText = document.createElement("input");
  inputText.setAttribute("placeholder", insertTitleholderText);
  inputText.setAttribute("class", insertSetClassText);

  return inputText;
}
function insertCardDomEventListenerCancel(buttonContainer, cardAddButtonFlag) {
  buttonContainer.remove();
  cardAddButtonFlag = false;
}
function insertCardElementButton(
  insertTitleholderButton,
  insertSetClassButton
) {
  let inputButton = document.createElement("button");
  inputButton.innerHTML = insertTitleholderButton;
  inputButton.setAttribute("class", insertSetClassButton);

  return inputButton;
}

function insertCardElement(cardArrIdx) {
  let buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "plus_todo");

  //input title, input context

  let inputtext1 = insertCardElementText("제목을 입력하세요", "input_title");
  let inputtext2 = insertCardElementText("내용을 입력하세요", "input_context");

  buttonContainer.appendChild(inputtext1);
  buttonContainer.appendChild(inputtext2);

  //input button1, input button2

  let childContainer = document.createElement("div");
  childContainer.setAttribute("class", "plus_button_between");

  let button1 = insertCardElementButton("취소", "plus_item_cancel");
  let button2 = insertCardElementButton("등록", "plus_item_join");

  //set button1, button2 eventhandler

  button1.addEventListener("click", function () {
    insertCardDomEventListenerCancel(buttonContainer, cardAddButtonFlag);
  });
  button2.addEventListener("click", function () {
    insertCardDomEventListener(
      cardArrIdx,
      inputtext1,
      inputtext2,
      buttonContainer
    );
  });

  childContainer.appendChild(button1);
  childContainer.appendChild(button2);

  buttonContainer.appendChild(childContainer);

  return buttonContainer;
}

function insertCardDom(currentColumnIdx) {
  cardAddButtonFlag = !cardAddButtonFlag;

  let unit = insertCardElement(currentColumnIdx);

  if (cardAddButtonFlag) {
    // function(currentColumnName => return index)
    cardPlusButtonInsertPlace[currentColumnIdx].appendChild(unit);
  } else {
    [unit] = document.getElementsByClassName("plus_todo");
    if (unit) unit.remove();
  }
}

function initCardDeleteModal(currentCard, current_item_id) {
  let cardModalInputLocation = currentCard;
  let [cardModalTemplates] =
    document.getElementsByClassName("card_delete_modal");
  let cardInputModal = document.importNode(cardModalTemplates.content, true);
  cardModalInputLocation.appendChild(cardInputModal);

  let cardModalItself = currentCard.getElementsByClassName(
    "card_modal_background"
  )[0];
  cardModalItself.style.display = "none";

  let [cardDeleteButtonCancel] =
    cardModalItself.getElementsByClassName("card_keep");
  let [cardDeleteButton] =
    cardModalItself.getElementsByClassName("card_delete");

  cardDeleteButton.addEventListener("click", function () {
    cardDeleteButtonEventListener(
      cardModalItself,
      currentCard,
      current_item_id
    );
  });
  cardDeleteButtonCancel.addEventListener("click", function () {
    cardDeleteButtonCancelEventListener(cardModalItself);
  });
}

function FixCardElement(currentCard) {
  let buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "plus_todo");

  //input title, input context
  let inputtext1 = insertCardElementText(
    currentCard.getElementsByClassName("item_name")[0].innerHTML,
    "input_title"
  );
  let inputtext2 = insertCardElementText(
    currentCard.getElementsByClassName("item_tag")[0].innerHTML,
    "input_context"
  );

  buttonContainer.appendChild(inputtext1);
  buttonContainer.appendChild(inputtext2);

  //input button1, input button2

  let childContainer = document.createElement("div");
  childContainer.setAttribute("class", "plus_button_between");

  let button1 = insertCardElementButton("취소", "plus_item_cancel");
  let button2 = insertCardElementButton("수정", "plus_item_join");
  //set button1, button2 eventhandler

  button1.addEventListener("click", function () {
    fixCardDomEventListenerCancel(buttonContainer, currentCard);
  });

  button2.addEventListener("click", function () {
    fixCardDomEventListener(buttonContainer, currentCard);
  });

  childContainer.appendChild(button1);
  childContainer.appendChild(button2);

  buttonContainer.appendChild(childContainer);

  return buttonContainer;
}

function getColumnIdxbyCardIdx(cardIdx) {
  let colIdx = 0;
  columnArray.getColumn().forEach((element, index) => {
    if (element.name == cardArray.getcard()[cardIdx].status){
        colIdx = index;
    }
  });

  return colIdx;
}
export { addCard, FixCardElement,insertCardDom, insertCardDomEventListenerCancel,cardAddButtonFlag, initCardDeleteModal ,getColumnIdxbyCardIdx};

