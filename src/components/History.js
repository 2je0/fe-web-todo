import Component from '../core/Component.js';

export default class History extends Component {
  setup() {}

  template() {
    const { userId, createdAt } = this.$props.history;
    return `
    <li>
      <img src="./asset/user-img.svg" />
      <div class="history-content-container">
        <div class="history-content-id">@${userId}</div>
        <div class="history-content-desc">
          ${this.getDescription()}

        </div>
        <div class="history-content-time">${createdAt}</div>
      </div>
    </li>
    `;
  }

  mounted() {}

  setEvent() {}

  getDescription() {
    const { actionType, finalState, task, initialState } = this.$props.history;
    if (actionType === '등록') {
      return `<span>${finalState}</span>에 <span>${task}</span>를 <span>${actionType}</span>하였습니다.`;
    }
    if (actionType === '삭제') {
      return `<span>${task}</span>를 <span>${finalState}</span>에서 <span>${actionType}</span>하였습니다.`;
    }
    if (actionType === '변경') {
      return `<span>${task}</span>를 <span>${initialState}</span>에서 <span>${finalState}</span>로 <span>${actionType}</span>하였습니다.`;
    }
    if (actionType === '이동') {
      return `<span>${task}</span>를 <span>${initialState}</span>에서 <span>${finalState}</span>로 <span>${actionType}</span>하였습니다.`;
    }
  }
}
