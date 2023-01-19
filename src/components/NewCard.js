import { ACTION } from '../constants.js';
import Component from '../core/Component.js';
import { TodoListStore } from '../store/TodoListStore.js';
import PropertyFinder from '../util/PropertyFinder.js';
import { getNewCard, resizeTextArea } from '../util/util.js';
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
    const { card: cardData } = this.$props;
    const $accentBtn = this.$target.querySelector('.btn-accent');
    const title = cardData?.title || '';
    if (title) $accentBtn.disabled = false;
    resizeTextArea(this.$target.querySelector('textarea'));
  }

  setEvent() {
    this.addEvent('click', '.btn-accent', ({ target }) => {
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

    this.addEvent('click', '.btn-normal', ({ target }) => {
      const targetProperty = new PropertyFinder(target);
      const { isModifying, columnIdx, cardContainer } =
        targetProperty.getAllProperty();
      if (isModifying) {
        cardContainer.classList.remove('modifying');
        this.$props.reRender();
        return;
      }
      TodoListStore.dispatch(ACTION.CANCEL_ADDING_STATE, { columnIdx });
    });

    this.addEvent('keydown', 'textarea', ({ target }) => {
      resizeTextArea(target);
    });

    this.addEvent('keyup', 'textarea', ({ target }) => {
      resizeTextArea(target);
    });
  }
}
