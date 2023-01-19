# fe-web-todo

# 🧰 기능

## Column 추가, 삭제

![](./gif/add-delete-column.gif)

## Card 추가, 삭제

![](./gif/add-delete-card.gif)

## Card 내용 수정

![](./gif/modify-card.gif)

## Column 제목 수정

![](./gif/modify-column.gif)

## History 남기기

![](./gif/history.png)

---

# 🏋️ 도전사항 ⁉️ 🏋️

## 드래그와 더블클릭 같이 쓰기

![](./gif/dblclickNdrag.gif)

드래그를 했을 때는 카드의 위치를 바꿀 수 있어야 하고, 더블클릭으로는 카드의 내용을 수정하도록 기능 구현을 해야 합니다. draggable api를 사용하지 않고 drag n drop 을 구현하기 위해서는 mouse down 이벤트로 드래그의 시작을 알려야 합니다. 그리고 드래그 이벤트를 시작하죠. 하지만 더블클릭을 하려고 해도 mousedown을 수행하게 되는데 이는 더블클릭이 안되는 현상을 유발합니다. 더블클릭을 하려고 mousedown을 하면 드래그 이벤트가 발동하기 때문이죠. 저는 이를 `시간차`를 이용해서 해결하였습니다.

mousedown 이벤트는 다음과 같이 구성합니다.

- mousedown 이 후 클릭이 되고 있는지 `isPress` 변수로 알 수 있게 합니다.
- 계속 붙잡고 있는지 판단하는 hold 함수를 일정 시간 뒤에 실행시키도록 만듭니다.
- 일정 시간 이후에도 누르고 있다면 drag 이벤트를 실행시키고 그렇지 않다면 더블클릭 이벤트를 실행시키도록 합니다.

```js
  //...
  DELAY = 400;
  timer = null;
  isPress = false;

  mouseDown(event) {
    this.isPress = true;
    this.timer = setTimeout(() => {
      this.hold(event);
    }, this.DELAY);
  }

  hold(event) {
    if (this.timer) clearTimeout(this.timer);
    if (this.isPress) this.drag(event);
  }
```

---

## 🚀 드래그 앤 드랍 구현하기 🚀

![](./gif/dragNdrop.gif)

드래그앤 드랍을 구현하기 위한 단계는 다음과 같습니다.

1. 드래그 하려는 노드를 복제
   - 복제한 노드(떠다니는 노드)를 `draggingNode` 라고 부르겠습니다.
   - 복제당한 노드(잔상)를 `fixedDragNode` 라고 부르겠습니다.
2. `draggingNode` 를 document.body위에 붙이고 위치는 absolute로 마우스를 따라다니게 합니다.
3. 현재 마우스의 위치 확인
   - 드랍가능한 곳 위에 있는가?
   - 드랍가능한 곳이 최근 드랍가능했던 곳과 일치하는가?
   - 더미 드랍노드인가? (칼럼 최하단에 드랍 가능하도록 하기 위해 임의로 추가)
   - 드랍 가능한 노드의 윗쪽인가? 아랫쪽인가?
4. 잔상을 여러 시나리오(3번의 갈래길)에 따라 적당한 곳으로 삽입
5. 마우스를 놓았을 때
   - 잔상이 있는 곳으로 노드 이동

이제 전체 로직을 하나씩 보겠습니다.

**_STEP 0_**  
카드에 이벤트를 걸어줍니다.

```js
this.addEvent('mousedown', '.card-container:not(.modifying)', (e) => {
  dragEvent.mouseDown(e);
});
```

**_STEP 1_**  
카드에 이벤트를 걸어줍니다. 저는 더블클릭과 드래그 이벤트를 동시에 사용하고 싶어 mouseDown 메소드에 여러가지를 추가하였습니다. [여기](#드래그와-더블클릭-같이-쓰기)를 참조하여 drag메소드 부터 시작합니다.

```js
drag(event) {
  const onMouseMoveCallBack = this.onMouseMove.bind(this);
  this.setDraggingNodeProperty(event);
  document.addEventListener('mousemove', onMouseMoveCallBack);

  this.$draggingNode.addEventListener('mouseup', () => {
    this.dragEnd(onMouseMoveCallBack);
  });
}
```

`setDraggingNodeProperty`는 드래그 하려는 노드가 전체 데이터중 몇번째 인덱스에 있는 노드인지 세팅하는 내용입니다. 각자의 데이터 구조에 맞게 세팅하신 후 마지막 `getDraggingNode`를 봐주세요.  
cloneNode로 target을 복사해준 후 position 설정, 그리고 document.body로 노드를 빼는것입니다.

```js
setDraggingNodeProperty(event) {
  const dargTargetProperty = new PropertyFinder(event.target);
  const {
    cardContainer: $fixedDragNode,
    columnIdx: oldColumnIdx,
    cardIdx: oldCardIdx,
  } = dargTargetProperty.getAllProperty();
  this.$fixedDragNode = $fixedDragNode;
  this.oldColumnIdx = oldColumnIdx;
  this.oldCardIdx = oldCardIdx;
  this.$draggingNode = this.getDraggingNode($fixedDragNode);
}
//...

getDraggingNode(dragTarget) {
  const draggingNode = dragTarget.cloneNode(true);
  draggingNode.classList.add('dragging-move');
  dragTarget.classList.remove('droppable');
  dragTarget.classList.add('dragging-fix');

  draggingNode.style.position = 'absolute';
  draggingNode.style.zIndex = 1000;
  document.body.append(draggingNode);
  return draggingNode;
}
```

**_STEP 2_**  
`draggingNode`의 위치를 바꿀 수 있는 메소드를 만들어줍니다. 마우스를 따라다니게 만들기 위함이죠.

```js
draggingNodeMoveAt(pageX, pageY) {
  this.$draggingNode.style.left =
    pageX - this.$draggingNode.offsetWidth / 2 + 'px';
  this.$draggingNode.style.top =
    pageY - this.$draggingNode.offsetHeight / 2 + 'px';
}
```

이제 다음과 같이 드래깅 노드를 마우스 위치와 동기화 시킵니다.

```js
onMouseMove(event) {
  this.draggingNodeMoveAt(event.pageX, event.pageY);
  //more logic...
}
```

**_STEP 3-1_**  
현재 마우스의 위치 확인: `elementFromPoint`으로 현재 마우스의 위치 아래에 어떠한 요소가 있는지 불러오고 그 요소에서 가장 가까운 카드요소를 찾아줍니다.

```js
getDroppableBelow(event) {
  this.$draggingNode.hidden = true;
  const $elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  this.$draggingNode.hidden = false;
  if (!$elemBelow) return;
  const $droppableBelow = $elemBelow.closest('.droppable');
  //여기까지 step3-1
  const rect = $droppableBelow && $droppableBelow.getBoundingClientRect();
  const isUpperSide = rect && event.clientY < rect.top + rect.height / 2;
  return { $droppableBelow, isUpperSide };
}
```

**_STEP 3-2_**  
그리고 마우스의 위치와 위에서 찾은 요소의 상태를 비교합니다.
isNewNodeState : 최근에 만났던 카드와 지금 마우스 아래에 있는 카드가 다른가?  
isDummyNode : 더미 드라퍼블인가? (더미는 칼럼의 최하단에 위치하고 있으며 더미를 만났을 땐 무조건 위로 삽입해야함)  
isChangeUpDownSide: 마우스가 요소의 위쪽에 있는가? 아래쪽에 있는가? (위쪽에 있다면 before로 삽입해주고 아래쪽에 있다면 after로 삽입해주기 위함)

```js
 onMouseMove(event) {
  //...
  const { $droppableBelow, isUpperSide } = this.getDroppableBelow(event);
  if (!$droppableBelow) return;
  const isNewNodeState = this.$currentDroppable !== $droppableBelow;
  const isDummyNode = $droppableBelow.classList.contains('dummy-droppable');
  const isChangeUpDownSide = this.isCurrentSideUpper !== isUpperSide;
  //...
}
```

**_STEP 4_**  
잔상의 삽입

```js
onMouseMove(event) {
  //...
  if (isNewNodeState) {
    this.$currentDroppable = $droppableBelow;
    if (isDummyNode) {
      $droppableBelow.before(this.$fixedDragNode);
    } else {
      if (isUpperSide) $droppableBelow.before(this.$fixedDragNode);
      else $droppableBelow.after(this.$fixedDragNode);
      this.isCurrentSideUpper = isUpperSide;
    }
  } else {
    if (isDummyNode) return;
    if (!isChangeUpDownSide) return;
    if (isUpperSide) $droppableBelow.before(this.$fixedDragNode);
    else $droppableBelow.after(this.$fixedDragNode);
    this.isCurrentSideUpper = isUpperSide;
  }
}
```

**_STEP 5_**  
마우스를 놓았을 때: 복잡해 보이지만 여태까지 다뤘던 두 노드를 삭제하고 본인의 로직에 맞추어 데이터를 수정 (또는 View의 변경)해주면 됩니다. 핵심로직은 `removeBothDragNode`와
`TodoListStore.dispatch(ACTION.TRANSFER_CARD, {})` 입니다.

```js
drag(event) {
 //...
  this.$draggingNode.addEventListener('mouseup', () => {
    this.dragEnd(onMouseMoveCallBack);
  });
}
```

```js
dragEnd(onMouseMoveCallBack) {
  const { columnIdx: newColumnIdx, cardIdx: newCardIdx } =
    this.getIdxOfFixedDragNode();
  document.removeEventListener('mousemove', onMouseMoveCallBack);

  this.attachReturnAnimation(this.$fixedDragNode, this.$draggingNode);
  setTimeout(() => {
    this.removeBothDragNode();
    TodoListStore.dispatch(ACTION.TRANSFER_CARD, {
      oldColumnIdx: this.oldColumnIdx,
      oldCardIdx: this.oldCardIdx,
      newColumnIdx,
      newCardIdx,
    });
  }, 400);
}
```

---

## json-server 연동하기

서버 돌리기 `json-server --watch db.json --port 3001`
![](./gif/json-server.gif)

---

## component 구현

---

## 🥊 **flux pattern 흉내내기** 🥊

Flux는 사용자 입력을 기반으로 Action을 만들고 Action을 Dispatcher에 전달하여 Store(Model)의 데이터를 변경한 뒤 View에 반영하는 단방향의 흐름으로 애플리케이션을 만드는 아키텍처입니다. 구조는 다음의 그림과 같습니다.
![](./gif/flux-pattern.png)

### **Action**

Action이란 사용자가 어떠한 이유로든 데이터를 변경하는 행위입니다. dispatch 메서드는 새로 발생한 Action의 종류(actionKey)와 새로운 데이터(payload)를 묶어 Dispatcher에게 전달합니다.  
다양한 액션이 있겠지만 예를 들어 `/src/App.js`의 코드를 보겠습니다.

```js
import { TodoListStore } from './store/TodoListStore.js';
//...
this.addEvent('click', '.fab', () => {
  TodoListStore.dispatch(ACTION.ADD_COLUMN);
});
```

`fab` 버튼을 누르면 TodoListStore 의 dispatcher로 유저 액션을 전달해줍니다.

<br>

### **Dispather**

Dispatcher는 모든 데이터의 흐름을 관리하는 중앙 허브입니다. Dispatcher에는 Store들이 등록해놓은 Action 타입에 따라 데이터를 가공하고 새로운 state를 반환합니다. Store의 데이터를 조작하는 것은 Dispatcher를 통해서만 가능합니다.  
`/src/store/TodoListStore.js`의 코드를 보겠습니다.

```js
const reducer = (state, actionKey, payload = {}) => {
  //...
  switch (actionKey) {
    case ACTION.ADD_COLUMN:
      return DataHandler.addColumn(newState);
    case ACTION.INIT_DATA:
      return getServerData();
    case ACTION.TOGGLE_NEW_CARD:
      return DataHandler.toggleNewCard(newState, columnIdx);
    case ACTION.DELETE_COLUMN:
      return DataHandler.deleteColumn(newState, columnIdx);
    // more cases...
  }
};

export const TodoListStore = new Store(initState, reducer);
```

actionKey 가 `ADD_COLUMN` 이었으니 `DataHandler.addColumn`가 호출되며 새로운 컬럼을 추가한 새로운 state가 반환되게 되고 (DataHandler의 내용) reducer 또한 그 새로운 state를 반환합니다.

<br>

### **Store**

위에서 봤던 코드의 마지막 줄 `new Store()`의 정체를 `/src/store/Store.js`에서 보겠습니다.

```js
class Store {
  #state;
  #listeners;
  #reducer;

  constructor(state, reducer) {
    this.#state = state;
    this.#reducer = reducer;
  }

  getState() {
    return { ...this.#state };
  }

  subscribe(func) {
    this.#listeners = func;
  }

  publish() {
    this.#listeners();
  }

  async dispatch(actionKey, { ...payload } = {}) {
    this.#state = await this.#reducer(this.#state, actionKey, { ...payload });
    this.publish();
  }
}
```

위에 있던 reducer가 실행이 되며 새로운 state를 반환하고 그 state를 TodolistStore의 state로 저장한 후 publish(View를 렌더하는 메소드) 하게 됩니다. 해당 state와 관련된 많은 listeners들에게 전부 알려주는 것 또한 가능합니다. `#listeners = new Set();` 또는 Map 배열 등 상황에 따라 다양한 listeners를 구성하는 것이 가능하지만 본 프로젝트에서는 App을 렌더하는 것으로 충분하기에 위와 같이 구현하였습니다.

```js
// src/App.js
class App extends Component {
  setup() {
    //...
    TodoListStore.subscribe(this.render.bind(this));
  }
  //...
}
```

App에서 렌더 메소드를 구독하면 listeners에 저장되고, reducer를 통해 들어온 명령으로 state를 바꾼후 publish를 통해 해당 렌더 함수를 호출하는 구조입니다.

---

## card details 늘리기
