const BASE_URL = 'http://localhost:3001';

export async function addNewColumnToServer() {
  const url = `${BASE_URL}/columns`;
  const newColumnData = {
    title: '제목 없음',
    cards: [],
    addingState: false,
  };
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newColumnData),
  });
  const data = await response.json();
  return data.id;
}

export async function addHistoryToServer(newHistory) {
  const url = `${BASE_URL}/historys`;
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newHistory),
  });
}

export async function getServerData(setState) {
  const columnUrl = `${BASE_URL}/columns`;
  const historyUrl = `${BASE_URL}/historys`;
  const columnResponse = await fetch(columnUrl, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const historyResponse = await fetch(historyUrl, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const columns = await columnResponse.json();
  const historys = await historyResponse.json();
  setState({ columns, historys });
  return { columns, historys };
}

export async function putServerColumn(columnId, columnData) {
  const url = `${BASE_URL}/columns/${columnId}`;
  const response = await fetch(url, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(columnData),
  });
  const data = await response.json();
  return data;
}

export async function deleteServerColumn(columnId) {
  const url = `${BASE_URL}/columns/${columnId}`;
  const response = await fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
