import { FETCH_CONSTANT } from '../constants/constants.js';

async function fetchPost(storage, bodyData) {
  const url = FETCH_CONSTANT.SERVER_URL + storage;
  await fetch(url, {
    method: FETCH_CONSTANT.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });
}

async function fetchDelete(storage, idx) {
  const url = FETCH_CONSTANT.SERVER_URL + storage + '/' + idx;
  await fetch(url, {
    method: FETCH_CONSTANT.DELETE,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function fetchPut(storage, idx, bodyData) {
  const url = FETCH_CONSTANT.SERVER_URL + storage + '/' + idx;
  await fetch(url, {
    method: FETCH_CONSTANT.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  });
}

async function getJSONData(storage) {
  const url = FETCH_CONSTANT.SERVER_URL + storage;
  const response = await fetch(url, {
    method: FETCH_CONSTANT.GET,
  });

  const data = await response.json();
  return data;
}

export { fetchPost, fetchDelete, fetchPut, getJSONData };
