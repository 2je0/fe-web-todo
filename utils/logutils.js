import { logArray, logElement } from "../dataStorage.js";
import { getHistoryTemplate } from "../Sidebar/historyTemplate.js";

function insertHistory(element){
    const sidebarMain = document.getElementById("sidebar_main");
    sidebarMain.insertAdjacentHTML('afterbegin',getHistoryTemplate(element));
}
function makeLog(action, cardName, logDate, cardFrom, cardTo,storageId) {
  const newLog = new logElement(action, cardName, logDate, cardFrom, cardTo,storageId);
  logArray.pushLogArray(newLog);
  insertHistory(logArray.getLogArray().at(-1));
}


export { makeLog,insertHistory };
