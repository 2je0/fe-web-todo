import { Store } from './Store.js';
import { ACTION } from '../constants.js';
import { DataHandler } from './DataHandler.js';
import { getServerData } from '../util/fetchUtil.js';
const initState = { columns: [], historys: [] };

const reducer = (state, actionKey, payload = {}) => {
  const { cardIdx, columnIdx, cardData, value } = payload;
  const { oldColumnIdx, oldCardIdx, newColumnIdx, newCardIdx } = payload;
  const newState = { ...state };
  switch (actionKey) {
    case ACTION.ADD_COLUMN:
      return DataHandler.addColumn(newState);
    case ACTION.INIT_DATA:
      return getServerData();
    case ACTION.TOGGLE_NEW_CARD:
      return DataHandler.toggleNewCard(newState, columnIdx);
    case ACTION.DELETE_COLUMN:
      return DataHandler.deleteColumn(newState, columnIdx);
    case ACTION.MODIFY_CARD:
      return DataHandler.modifyCard(newState, columnIdx, cardIdx, cardData);
    case ACTION.ADD_CARD:
      return DataHandler.addCard(newState, columnIdx, cardData);
    case ACTION.DELETE_CARD:
      return DataHandler.deleteCard(newState, columnIdx, cardIdx);
    case ACTION.CANCEL_ADDING_STATE:
      return DataHandler.cancelAddingState(newState, columnIdx);
    case ACTION.MODIFY_COLUMN_TITLE:
      return DataHandler.modifyColumnTitle(newState, columnIdx, value);
    case ACTION.TRANSFER_CARD:
      return DataHandler.transferCard(
        newState,
        oldColumnIdx,
        oldCardIdx,
        newColumnIdx,
        newCardIdx
      );
    default:
      return { ...state };
  }
};

export const TodoListStore = new Store(initState, reducer);
