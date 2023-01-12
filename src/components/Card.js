import { modalShow } from '../../util.js';
import Component from '../core/Component.js';
import PropertyFinder from '../util/PropertyFinder.js';
import NewCard from './NewCard.js';

export default class Card extends Component {
  setup() {}

  template() {
    const card = this.$props.card;
    return `
    <div class="todo-list-contents-container">
    <div class="todo-list-contents-header-container">
                <div class="todo-list-contents-header-text">
                  ${card.title}
                </div>
                <button class="btn-card-x">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M1.5 11.25L0.75 10.5L5.25 6L0.75 1.5L1.5 0.75L6 5.25L10.5 0.75L11.25 1.5L6.75 6L11.25 10.5L10.5 11.25L6 6.75L1.5 11.25Z"
                      fill="#828282"
                    />
                  </svg>
                </button>
              </div>
              <ul class="todo-list-contents-desc-container">
              ${card.details.map((ele) => `<li>${ele}</li>`).join('')}
              </ul>
              <div class="todo-list-contents-footer">${card.footer}</div>
              </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-card-x', () => {
      const card = this.$target.querySelector('.todo-list-contents-container');
      card.classList.add('content-delete');
      modalShow();
    });

    this.addEvent('mouseover', '.btn-card-x', () => {
      const card = this.$target.querySelector('.todo-list-contents-container');
      card.classList.add('content-delete-hover');
    });

    this.addEvent('mouseout', '.btn-card-x', () => {
      const card = this.$target.querySelector('.todo-list-contents-container');
      card.classList.remove('content-delete-hover');
    });
    this.addEvent('dblclick', '.card-container', ({ target }) => {
      const $card = target.closest('.card-container');
      $card.classList.add('modifying');

      const cardData = this.$props.card;
      new NewCard(this.$target, {
        card: cardData,
        modifyCard: this.$props.modifyCard,
        reRender: this.$props.reRender,
      });
    });
    /* drag n drop
     * 리팩토링 해야될 코드
     *
     *
     */
    const DELAY = 400;
    let timer = null;
    let isPress = false;

    function mouseDown(e, transferCardFn) {
      isPress = true;
      timer = setTimeout(() => {
        hold(e, transferCardFn);
      }, DELAY);
    }

    function hold(e, transferCardFn) {
      if (timer) clearTimeout(timer);
      if (isPress) drag(e, transferCardFn);
    }

    function mouseUp() {
      isPress = false;
    }

    function dblClick() {
      console.log('dblClick');
    }

    this.addEvent('mousedown', '.card-container:not(.modifying)', (e) => {
      mouseDown(e, this.$props.transferCard);
    });
    this.addEvent('mouseup', '.card-container', mouseUp);
    this.addEvent('dblclick', '.card-container', dblClick);

    function drag(e, transferCardFn) {
      const targetProperty = new PropertyFinder(e.target);
      const {
        cardContainer,
        columnIdx: oldcolumnIdx,
        cardIdx: oldcardIdx,
      } = targetProperty.getAllProperty();
      const node = cardContainer.cloneNode(true);
      node.classList.add('dragging-move');
      cardContainer.classList.remove('droppable');
      cardContainer.classList.add('dragging-fix');
      // node.classList.remove('droppable');
      node.style.position = 'absolute';
      node.style.zIndex = 1000;
      document.body.append(node);
      function moveAt(pageX, pageY) {
        node.style.left = pageX - node.offsetWidth / 2 + 'px';
        node.style.top = pageY - node.offsetHeight / 2 + 'px';
      }
      // 포인터 아래로 공을 이동시킵니다.
      moveAt(e.pageX, e.pageY);
      let currentDroppable = cardContainer;
      let isCurrentSideUpper = true;

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
        node.hidden = true;
        const elemBelow = document.elementFromPoint(
          event.clientX,
          event.clientY
        );
        node.hidden = false;
        if (!elemBelow) return;
        const droppableBelow = elemBelow.closest('.droppable');
        const rect = droppableBelow && droppableBelow.getBoundingClientRect();
        const isUpperSide = rect && event.clientY < rect.top + rect.height / 2;

        if (!droppableBelow) return;
        if (currentDroppable !== droppableBelow) {
          currentDroppable = droppableBelow;
        }
        if (currentDroppable === droppableBelow) {
          if (isCurrentSideUpper === isUpperSide) return;
          isCurrentSideUpper = isUpperSide;
          if (isUpperSide)
            droppableBelow.previousElementSibling.insertAfter(cardContainer);
          else droppableBelow.insertAfter(cardContainer);
        }
      }

      // (2) mousemove로 공을 움직입니다.
      document.addEventListener('mousemove', onMouseMove);
      // (3) 공을 드롭하고, 불필요한 핸들러를 제거합니다.
      node.addEventListener('mouseup', () => {
        // if (currentDroppable) {
        // debugger;
        const pointTobeDropped = document.querySelector('.dragging-fix');
        const currentDroppableProperty = new PropertyFinder(pointTobeDropped);
        const { columnIdx: newColumnIdx, cardIdx: newCardIdx } =
          currentDroppableProperty.getAllProperty();
        // const newCardIdx = cardIdx + (isCurrentSideUpper ? 0 : 1);
        // console.log(
        //   `card: ${newCardIdx}, side: ${isCurrentSideUpper ? 'up' : 'down'}`
        // );
        document.removeEventListener('mousemove', onMouseMove);
        node.onmouseup = null;
        cardContainer.remove();
        node.remove();
        console.log(oldcardIdx, newCardIdx);
        transferCardFn(oldcolumnIdx, oldcardIdx, newColumnIdx, newCardIdx);
      });
    }
  }
}
