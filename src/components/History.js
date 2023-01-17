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
        <div class="history-content-time">${this.timeForToday(createdAt)}</div>
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

  timeForToday(createdAt) {
    const today = new Date();
    const timeValue = new Date(createdAt);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    if (betweenTime < 1) return '방금 전';
    if (betweenTime < 60) {
      return `${betweenTime}분 전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일 전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년 전`;
  }
}
