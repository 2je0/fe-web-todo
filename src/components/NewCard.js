import Component from '../core/Component.js';
import PropertyFinder from '../util/PropertyFinder.js';

export default class NewCard extends Component {
  setup() {
    this.$state = this.$props.card || {
      title: '',
      details: [],
      footer: 'author by web',
    };
  }

  template() {
    return `
    <div class="todo-list-contents-container content-new">
    <div class="todo-list-contents-header-container">
    <input
      class="todo-list-contents-header-text"
      placeholder="제목을 입력하세요"
    />
  </div>
  ${this.$state.details
    .map(
      (detail) => `<input
  class="todo-list-contents-desc-container"
  placeholder="내용을 입력하세요"
  value="${detail}"
/>`
    )
    .join('')}
  ${
    this.$state.details.length
      ? ''
      : `<input
  class="todo-list-contents-desc-container"
  placeholder="내용을 입력하세요"
/>`
  }
  
  <div class="todo-list-new-contents-btn-container ">
    <button class="btn btn-normal">취소</button>
    <button class="btn btn-accent" disabled>등록</button>
  </div>
  </div>
    `;
  }
  mounted() {
    const cardData = this.$props.card;
    const $accentBtn = this.$target.querySelector('.btn-accent');
    const title = cardData?.title || '';
    if (title) $accentBtn.disabled = false;
    const $title = this.$target.querySelector(
      '.todo-list-contents-header-text'
    );
    $title.value = title;
  }

  setEvent() {
    this.addEvent('click', '.btn-accent', ({ target }) => {
      const targetProperty = new PropertyFinder(target);
      const { columnIdx, cardIdx, cardData, isModifying } =
        targetProperty.getAllProperty();
      if (isModifying) this.$props.modifyCard(columnIdx, cardIdx, cardData);
      if (!isModifying) this.$props.addCard(columnIdx, cardData);
    });

    this.addEvent('click', '.btn-normal', ({ target }) => {
      const targetProperty = new PropertyFinder(target);
      const { isModifying, columnIdx } = targetProperty.getAllProperty();
      if (isModifying) {
        return;
      }
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
