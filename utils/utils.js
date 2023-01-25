function innerCircleCount(currentColumnIndex) {
  let i = currentColumnIndex;
  let count = 0;
  document.getElementsByClassName('circle')[i].innerHTML = count;
}

export { innerCircleCount };
