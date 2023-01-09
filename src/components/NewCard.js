import { getColumnIdxFromColumn, nthChild } from '../../util.js';
import Component from '../core/Component.js';

export default class NewCard extends Component {
  setup() {}

  template() {
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
  <div class="todo-list-new-contents-btn-container">
    <button class="btn btn-normal">취소</button>
    <button class="btn btn-accent">등록</button>
  </div>
  </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.btn-accent', () => {
      const column = this.$target.parentNode;
      const columnIdx = getColumnIdxFromColumn(column);

      const title = column.querySelector(
        '.todo-list-contents-header-text'
      ).value;
      const details = column.querySelector(
        '.todo-list-contents-desc-container'
      ).value;
      const newCard = {
        title,
        details: [details],
        footer: 'author by web',
      };
      this.$props.addCard(columnIdx, newCard);
    });

    this.addEvent('click', '.btn-normal', () => {
      const column = this.$target.parentNode;
      const columnIdx = getColumnIdxFromColumn(column);
      this.$props.cancelAddingState(columnIdx);
    });
  }
}
