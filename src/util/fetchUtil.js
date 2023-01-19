import { getNewColumn } from './util.js';

const BASE_URL = 'http://localhost:3001';

export async function addNewColumnToServer() {
  const url = `${BASE_URL}/columns`;
  const newColumnData = getNewColumn();
  const response = await fetch(url, getFetchData('post', newColumnData));
  const data = await response.json();
  return data.id;
}

export async function addHistoryToServer(newHistory) {
  const url = `${BASE_URL}/historys`;
  const response = await fetch(url, getFetchData('post', newHistory));
}

export async function getServerData() {
  const columnUrl = `${BASE_URL}/columns`;
  const historyUrl = `${BASE_URL}/historys`;
  const columnResponse = await fetch(columnUrl, getFetchData('get'));
  const historyResponse = await fetch(historyUrl, getFetchData('get'));
  const columns = await columnResponse.json();
  const historys = await historyResponse.json();
  return { columns, historys };
}

export async function putServerColumn(columnId, columnData) {
  const url = `${BASE_URL}/columns/${columnId}`;
  const response = await fetch(url, getFetchData('put', columnData));
  const data = await response.json();
  return data;
}

export async function deleteServerColumn(columnId) {
  const url = `${BASE_URL}/columns/${columnId}`;
  const response = await fetch(url, getFetchData('delete'));
  const data = await response.json();
  return data;
}

function getFetchData(method, bodyDataObject) {
  const ret = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (bodyDataObject) ret.body = JSON.stringify(bodyDataObject);
  return ret;
}
