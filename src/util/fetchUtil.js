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

export async function getServerColumns(setColumns) {
  const url = 'http://localhost:3001/columns';
  const response = await fetch(url, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  setColumns({ columns: data });
  return data;
}

export async function putServerColumn(columnIdx, columnData) {
  const url = `http://localhost:3001/columns/${columnIdx}`;
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

export async function deleteServerColumn(columnIdx) {
  const url = `http://localhost:3001/columns/${columnIdx}`;
  const response = await fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
