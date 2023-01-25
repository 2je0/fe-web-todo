import {initializeModal} from "./column/ColumnView.js";
import { loadingData,loadingLog } from "./loading.js";

function main() {
  initializeModal();
  loadingData();
  loadingLog();
}
main();
