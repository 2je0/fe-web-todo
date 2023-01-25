function innerCircleCount(currentColumnIndex) {
  let i = currentColumnIndex;
  let count = 0;
  document.getElementsByClassName('circle')[i].innerHTML = count;
}

export function $(identifier, node = document) {
  return node.querySelector(identifier);
}
export function $$(identifier, node = document) {
  return [...node.querySelectorAll(identifier)];
}

export { innerCircleCount };
