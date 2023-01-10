import {
  getCardIdxFromCard,
  getColumnIdxFromColumn,
  nthChild,
} from '../../util.js';
import Component from '../core/Component.js';

export default class NewCard extends Component {
  setup() {}

  template() {
    const card = this.$props?.card;
    const title = card?.title || '';
    return `
    <div class="todo-list-contents-container content-new">
    <div class="todo-list-contents-header-container">
    <input
      class="todo-list-contents-header-text"
      placeholder="제목을 입력하세요"
    />
  </div>
  <input
    class="todo-list-contents-desc-container"
    placeholder="내용을 입력하세요"
  />
  <div class="todo-list-new-contents-btn-container ">
    <button class="btn btn-normal">취소</button>
    <button class="btn btn-accent" disabled>등록</button>
  </div>
  </div>
    `;
  }
  mounted() {
    const card = this.$props.card;
    const $accentBtn = this.$target.querySelector('.btn-accent');
    const title = card?.title || '';
    if (title) $accentBtn.disabled = false;
    const $title = this.$target.querySelector(
      '.todo-list-contents-header-text'
    );
    $title.value = title;
  }

  setEvent() {
    this.addEvent('click', '.btn-accent', ({ target }) => {
      const $card = target.closest('.card-container');
      const ismodifying = $card && $card.classList.contains('modifying');

      const column = this.$target.parentNode;
      const columnIdx = getColumnIdxFromColumn(column);
      const card =
        target.closest('.new-card-container') ||
        target.closest('.card-container');
      const title = card.querySelector('.todo-list-contents-header-text').value;
      const details = card.querySelectorAll(
        '.todo-list-contents-desc-container'
      );
      //TODO: details.map -> map은 왜 안되는지...?
      const desc = [];
      details.forEach((ele) => {
        desc.push(ele.value);
      });

      const newCard = {
        title,
        details: desc,
        footer: 'author by web',
      };

      if (ismodifying) {
        const cardIdx = getCardIdxFromCard(card);
        this.$props.modifyCard(columnIdx, cardIdx, newCard);
        return;
      }

      this.$props.addCard(columnIdx, newCard);
    });

    this.addEvent('click', '.btn-normal', () => {
      console.log('asdf');
      const column = this.$target.parentNode;
      const columnIdx = getColumnIdxFromColumn(column);
      this.$props.cancelAddingState(columnIdx);
    });

    this.addEvent(
      'keyup',
      '.todo-list-contents-desc-container',
      ({ key, target }) => {
        if (key === 'Enter' && target.value.trim() !== '') {
          const node = document.createElement('input');
          node.classList.add('todo-list-contents-desc-container');
          node.placeholder = '내용을 입력하세요';
          target.insertAfter(node);
          node.focus();
        }
        if (key === 'Backspace' && target.value === '') {
          target.previousSibling.focus();
          target.remove();
        }
      }
    );

    this.addEvent('keyup', '.todo-list-contents-header-text', ({ target }) => {
      const $btn = this.$target.querySelector('.btn-accent');
      if (target.value.trim() !== '') $btn.disabled = false;
      else $btn.disabled = true;
    });
  }
}
