export async function addNewColumnToServer() {
  const url = 'http://localhost:3001/columns';
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
}

export async function addHistoryToServer(newHistory) {
  const url = 'http://localhost:3001/historys';
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newHistory),
  });
}

export async function getServerData(setState) {
  const columnUrl = 'http://localhost:3001/columns';
  const historyUrl = 'http://localhost:3001/historys';
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
  const url = `http://localhost:3001/columns/${columnId}`;
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
  const url = `http://localhost:3001/columns/${columnId}`;
  const response = await fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
