import { $ } from '../util.js';
import { addNewColumn } from '../View/ColumnView.js';

const btnFAB = $('.fab');

export const FabEventHandler = (state) => {
  btnFAB.addEventListener('click', () => {
    addNewColumn(state);
  });
};
