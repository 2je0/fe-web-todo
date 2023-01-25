const columnElement = function (name, storageId) {
  this.name = name || "blank";
  this.storageId = storageId;
};
columnElement.prototype.getName = function () {
  return this.name;
};
columnElement.prototype.setName = function (name) {
  this.name = name;
};
//column 정의, column 배열을 담고있고 각종 메소드가 있음.

const columnStorage = function () {
  this.arr = [];
};

columnStorage.prototype.pushColumn = function (columnElement) {
  this.arr = [...this.arr, columnElement];
};

columnStorage.prototype.getColumn = function () {
  return this.arr;
};

columnStorage.prototype.deconsteColumn = function (i) {
  this.arr.splice(i, 1);
};

columnStorage.prototype.fixColumn = function (i, columnElement) {
  this.arr[i] = columnElement;
};

columnStorage.prototype.returnLength = function () {
  return this.arr.length;
};

// cardElement 정의 card은 카드와 같다.

const cardElement = function (name, tag, date, status, storageId) {
  this.name = name;
  this.tag = tag;
  this.date = date;
  this.status = status;
  this.storageId = storageId;
};

cardElement.prototype.getcard = function () {
  return [this.name, this.tag, this.date, this.status];
};

cardElement.prototype.setcard = function (name, tag, date, status) {
  this.name = name;
  this.tag = tag;
  this.date = date;
  this.status = status;
};

// card의 정의, cardElement 배열을 담고 있고 메소드 정의가 되어있음.

const cardStorage = function () {
  this.arr = [];
};

cardStorage.prototype.pushcard = function (cardElement) {
  this.arr.push(cardElement);
};

cardStorage.prototype.deletecard = function (idx) {
  this.arr.splice(idx, 1);
};
cardStorage.prototype.fixcard = function (idx, cardElement) {
  this.arr[idx] = cardElement;
};

cardStorage.prototype.getcard = function () {
  return this.arr;
};

cardStorage.prototype.returnLength = function () {
  return this.arr.length;
};

cardStorage.prototype.findIdxByName = function (name) {
  let idx;
  this.getcard().forEach((element, index) => {
    if (this.arr[index].name == name) idx = index;
    return;
  });
  return idx;
};

cardStorage.prototype.returnStorageIdByName = function (name) {
  let idx = this.findIdxByName(name);
  return this.arr[idx].storageId;
};

// 로그 그 자체, 로그 배열을 이루는 기본요소, 로그 정보가 들어있다.

const logElement = function (
  functionName,
  cardName,
  logDate,
  cardFrom,
  cardTo,
  storageId
) {
  this.functionName = functionName;
  this.cardName = cardName;
  this.logDate = logDate;
  this.cardFrom = cardFrom;
  this.cardTo = cardTo;
  this.storageId = storageId;
};

logElement.prototype.getLog = function () {
  return [
    this.functionName,
    this.cardName,
    this.logDate,
    this.cardFrom,
    this.cardTo,
  ];
};

logElement.prototype.setLog = function (
  functionName,
  cardName,
  logDate,
  cardFrom,
  cardTo
) {
  this.functonName = functionName;
  this.cardName = cardName;
  this.logDate = logDate;
  this.cardFrom = cardFrom;
  this.cardTo = cardTo;
};

//로그 정보를 담고있는 배열역할의 클래스

const logStorage = function () {
  this.arr = [];
};

logStorage.prototype.getLogArray = function () {
  return this.arr;
};

logStorage.prototype.pushLogArray = function (logElement) {
  this.arr.push(logElement);
};

logStorage.prototype.fixLogArray = function (i, logElement) {
  this.arr[i] = logElement;
};

logStorage.prototype.testArray = function(){
  console.log(this.arr)
}

// 현재 시각
const columnArray = new columnStorage();
const cardArray = new cardStorage();
const logArray = new logStorage();

export {
  columnElement,
  cardElement,
  logElement,
  columnArray,
  cardArray,
  logArray,
};
