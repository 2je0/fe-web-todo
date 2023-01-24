import { ACTION, CLASS } from '../constants.js';
import Component from '../core/Component.js';
import { TodoListStore } from '../store/TodoListStore.js';
import PropertyFinder from '../util/PropertyFinder.js';
import { $, getNewCard, resizeTextArea } from '../util/util.js';
export default class NewCard extends Component {
  setup() {
    this.$state = this.$props.card || getNewCard();
  }

  detailTemplate(datails = []) {
    return `
    <textarea
      placeholder="내용을 입력하세요"
      class="todo-list-contents-detail"
      wrap="hard"
      cols="35"
      rows="1"
      style="white-space: pre-line;"
    >${datails.join(`\n`)}</textarea>
  `;
  }

  template() {
    const { title, details } = this.$state;
    return `
    <div class="todo-list-contents-container content-new">
      <div class="todo-list-contents-header-container">
        <input
          class="todo-list-contents-header-text"
          placeholder="제목을 입력하세요"
          value="${title}"
        />
      </div>
      <ul class="todo-list-contents-desc-container">
        ${this.detailTemplate(details)}
      </ul>
      <div class="todo-list-new-contents-btn-container">
        <button class="btn btn-normal">취소</button>
        <button class="btn btn-accent" disabled>등록</button>
      </div>
    </div>
    `;
  }
  mounted() {
    const { $target, $props } = this;
    const { card: cardData } = $props;
    const $accentBtn = $(CLASS.BTN_CARD_ACCENT, $target);
    const title = cardData?.title || '';
    if (title) $accentBtn.disabled = false;
    resizeTextArea($('textarea', $target));
  }

  setEvent() {
    const { $target, $props } = this;
    this.addEvent('click', CLASS.BTN_CARD_ACCENT, ({ target }) => {
      const targetProperty = new PropertyFinder(target);
      const { columnIdx, cardIdx, cardData, isModifying } =
        targetProperty.getAllProperty();
      if (isModifying)
        TodoListStore.dispatch(ACTION.MODIFY_CARD, {
          columnIdx,
          cardIdx,
          cardData,
        });
      if (!isModifying)
        TodoListStore.dispatch(ACTION.ADD_CARD, { columnIdx, cardData });
    });

    this.addEvent('click', CLASS.BTN_CARD_CANCEL, ({ target }) => {
      const targetProperty = new PropertyFinder(target);
      const { isModifying, columnIdx, cardContainer } =
        targetProperty.getAllProperty();
      if (isModifying) {
        cardContainer.classList.remove('modifying');
        $props.reRender();
        return;
      }
      TodoListStore.dispatch(ACTION.CANCEL_ADDING_STATE, { columnIdx });
    });

    this.addEvent('keyup', CLASS.CARD_TITLE, ({ target }) => {
      const $btn = $(CLASS.BTN_CARD_ACCENT, $target);
      if (target.value.trim() !== '') $btn.disabled = false;
      else $btn.disabled = true;
    });

    this.addEvent('keydown', 'textarea', ({ target }) => {
      resizeTextArea(target);
    });

    this.addEvent('keyup', 'textarea', ({ target }) => {
      resizeTextArea(target);
    });
  }
}
