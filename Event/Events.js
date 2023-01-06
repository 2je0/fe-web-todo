import { historyTabEventHandler } from './HistoryEvent.js';
import { FabEventHandler } from './FabEvent.js';
import { modalEventHandler } from './ModalEvent.js';

export const EventHandler = (state) => {
  historyTabEventHandler();
  FabEventHandler(state);
  modalEventHandler(state);
};
