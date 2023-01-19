import {
  addHistoryToServer,
  addNewColumnToServer,
  deleteServerColumn,
  putServerColumn,
} from '../util/fetchUtil.js';
import { getNewColumn } from '../util/util.js';

export const DataHandler = {
  async addColumn(newState) {
    const id = await addNewColumnToServer();
    const newColumnData = getNewColumn();
    newColumnData.id = id;
    newState.columns.push(newColumnData);
    console.log(newState);
    return newState;
  },

  toggleNewCard(newState, columnIdx) {
    const newColumns = newState.columns;
    newColumns[columnIdx].addingState = !newColumns[columnIdx].addingState;
    putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]);
    return newState;
  },

  async modifyCard(newState, columnIdx, cardIdx, newCardData) {
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

    await putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]);
    await addHistoryToServer(newHistory);
    return newState;
  },

  async addCard(newState, columnIdx, cardData) {
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

    await putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]);
    await addHistoryToServer(newHistory);
    return newState;
  },

  deleteColumn(newState, columnIdx) {
    deleteServerColumn(newState.columns[columnIdx].id);
    newState.columns.splice(columnIdx, 1);
    return newState;
  },

  async deleteCard(newState, columnIdx, cardIdx) {
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

    await putServerColumn(newColumns[columnIdx].id, newColumns[columnIdx]);
    await addHistoryToServer(newHistory);
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
    const newColumn = newColumns[columnIdx];
    newColumn.title = newTitle;
    putServerColumn(newColumn.id, newColumn);
    return newState;
  },

  async transferCard(
    newState,
    oldColumnIdx,
    oldCardIdx,
    newColumnIdx,
    newCardIdx
  ) {
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
    const columnFrom = newColumns[oldColumnIdx];
    const columnTo = newColumns[newColumnIdx];
    await putServerColumn(columnFrom.id, columnFrom);
    await putServerColumn(columnTo.id, columnTo);
    await addHistoryToServer(newHistory);

    return { columns: newColumns, historys: newHistorys };
  },
  getCardData(columns, columnIdx, cardIdx) {
    return { ...columns[columnIdx].cards[cardIdx] };
  },
  deleteCardData(columns, columnIdx, cardIdx) {
    columns[columnIdx].cards.splice(cardIdx, 1);
  },
  insertCardData(columns, columnIdx, cardIdx, cardData) {
    columns[columnIdx].cards.splice(cardIdx, 0, cardData);
  },
};
