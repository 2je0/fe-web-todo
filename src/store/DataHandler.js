import {
  addHistoryToServer,
  addNewColumnToServer,
  deleteServerColumn,
  putServerColumn,
} from '../util/fetchUtil.js';

export const DataHandler = {
  async addColumn(newState) {
    const id = await addNewColumnToServer();
    const newColumnData = {
      title: '제목 없음',
      cards: [],
      addingState: false,
      id,
    };
    newState.columns.push(newColumnData);
    return newState;
  },

  toggleNewCard(newState, columnIdx) {
    const newColumns = newState.columns;
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;
    putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]);
    return newState;
  },

  modifyCard(newState, columnIdx, cardIdx, newCardData) {
    const newHistorys = newState.historys;
    const newColumns = newState.columns;
    const newHistory = {
      imgUrl: './asset/user-img.svg',
      userId: 'sam',
      createdAt: new Date(),
      initialState: newCardData.title,
      finalState: newColumns[columnIdx].cards[cardIdx].title,
      actionType: '변경',
    };
    newHistorys.unshift(newHistory);

    newColumns[columnIdx].cards.splice(cardIdx, 1, newCardData);

    putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]).then(
      () => {
        addHistoryToServer(newHistory);
      }
    );
    return newState;
  },

  addCard(newState, columnIdx, cardData) {
    const newHistorys = newState.historys;
    const newColumns = newState.columns;
    const newHistory = {
      imgUrl: './asset/user-img.svg',
      userId: 'sam',
      createdAt: new Date(),
      finalState: newColumns[columnIdx].title,
      actionType: '등록',
      task: cardData.title,
    };
    newHistorys.unshift(newHistory);

    newColumns[columnIdx].cards.unshift(cardData);
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;

    putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]).then(
      () => {
        addHistoryToServer(newHistory);
      }
    );
    return newState;
  },

  deleteColumn(newState, columnIdx) {
    deleteServerColumn(newState.columns[columnIdx].id);
    newState.columns.splice(columnIdx, 1);
    return newState;
  },

  deleteCard(newState, columnIdx, cardIdx) {
    const newHistorys = newState.historys;
    const newColumns = newState.columns;
    const newHistory = {
      imgUrl: './asset/user-img.svg',
      userId: 'sam',
      createdAt: new Date(),
      finalState: newColumns[columnIdx].title,
      task: newColumns[columnIdx].cards[cardIdx].title,
      actionType: '삭제',
    };
    newHistorys.unshift(newHistory);

    newColumns[columnIdx].cards.splice(cardIdx, 1);

    putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]).then(
      () => {
        addHistoryToServer(newHistory);
      }
    );
    return newState;
  },

  cancelAddingState(newState, columnIdx) {
    const newColumns = newState.columns;
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;
    putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]);
    return newState;
  },

  modifyColumnTitle(newState, columnIdx, newTitle) {
    const newColumns = newState.columns;
    newColumns[columnIdx].title = newTitle;

    putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]).then();
    return newState;
  },

  transferCard(newState, oldColumnIdx, oldCardIdx, newColumnIdx, newCardIdx) {
    const newColumns = [...newState.columns];
    const oldCardData = this.getCardData(newColumns, oldColumnIdx, oldCardIdx);
    this.deleteCardData(newColumns, oldColumnIdx, oldCardIdx);
    this.insertCardData(newColumns, newColumnIdx, newCardIdx, oldCardData);

    const newHistorys = [...newState.historys];
    const newHistory = {
      imgUrl: './asset/user-img.svg',
      userId: 'sam',
      createdAt: new Date(),
      initialState: newState.columns[oldColumnIdx].title,
      finalState: newState.columns[newColumnIdx].title,
      task: newState.columns[newColumnIdx].cards[newCardIdx].title,
      actionType: '변경',
    };
    newHistorys.unshift(newHistory);

    putServerColumn(newColumns[oldColumnIdx].id, newColumns[oldColumnIdx])
      .then(() => {
        putServerColumn(newColumns[newColumnIdx].id, newColumns[newColumnIdx]);
      })
      .then(() => {
        addHistoryToServer(newHistory);
      });
    return { columns: newColumns, historys: newHistorys };
  },
  getCardData(columns, columnIdx, cardIdx) {
    if (!columns[columnIdx].cards) debugger;
    return { ...columns[columnIdx].cards[cardIdx] };
  },
  deleteCardData(columns, columnIdx, cardIdx) {
    columns[columnIdx].cards.splice(cardIdx, 1);
  },
  insertCardData(columns, columnIdx, cardIdx, cardData) {
    columns[columnIdx].cards.splice(cardIdx, 0, cardData);
  },
};
