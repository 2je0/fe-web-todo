import { ACTION } from '../constants.js';
import { TodoListStore } from '../store/TodoListStore.js';
import PropertyFinder from '../util/PropertyFinder.js';
import { $ } from '../util/util.js';

class DragEvent {
  DELAY = 400;
  timer = null;
  isPress = false;
  $currentDroppable = null;
  isCurrentSideUpper = null;
  $draggingNode;
  $fixedDragNode;

  constructor() {}

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

  mouseUp() {
    this.isPress = false;
  }

  drag(event) {
    const onMouseMoveCallBack = this.onMouseMove.bind(this);
    this.setDraggingNodeProperty(event);
    document.addEventListener('mousemove', onMouseMoveCallBack);

    this.$draggingNode.addEventListener('mouseup', () => {
      this.dragEnd(onMouseMoveCallBack);
    });
  }

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

  removeBothDragNode() {
    this.$fixedDragNode.remove();
    this.$draggingNode.remove();
  }

  getIdxOfFixedDragNode() {
    const pointTobeDropped = $('.dragging-fix');
    const currentDroppableProperty = new PropertyFinder(pointTobeDropped);
    return currentDroppableProperty.getAllProperty();
  }

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

  onMouseMove(event) {
    this.draggingNodeMoveAt(event.pageX, event.pageY);
    const { $droppableBelow, isUpperSide } = this.getDroppableBelow(event);
    if (!$droppableBelow) return;
    const isNewNodeState = this.$currentDroppable !== $droppableBelow;
    const isDummyNode = $droppableBelow.classList.contains('dummy-droppable');
    const isChangeUpDownSide = this.isCurrentSideUpper !== isUpperSide;

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

  draggingNodeMoveAt(pageX, pageY) {
    this.$draggingNode.style.left =
      pageX - this.$draggingNode.offsetWidth / 2 + 'px';
    this.$draggingNode.style.top =
      pageY - this.$draggingNode.offsetHeight / 2 + 'px';
  }

  getDroppableBelow(event) {
    this.$draggingNode.hidden = true;
    const $elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    this.$draggingNode.hidden = false;
    if (!$elemBelow) return;
    const $droppableBelow = $elemBelow.closest('.droppable');
    const rect = $droppableBelow && $droppableBelow.getBoundingClientRect();
    const isUpperSide = rect && event.clientY < rect.top + rect.height / 2;
    return { $droppableBelow, isUpperSide };
  }

  attachReturnAnimation(nodeTo, nodeFrom) {
    const { diffXPosition, diffYPosition } = this.getDiffVector(
      nodeTo,
      nodeFrom
    );
    nodeFrom.style.transform = `translate(${diffXPosition}px,${diffYPosition}px)`;
    nodeFrom.style.transitionDuration = '0.4s';
    nodeFrom.style.transitionTimingFunction = 'cubic-bezier(.13,.7,.31,.79)';
  }

  getDiffVector(nodeTo, nodeFrom) {
    const nodeToPosition = nodeTo.getBoundingClientRect();
    const nodeFromPosition = nodeFrom.getBoundingClientRect();
    const diffXPosition = nodeToPosition.left - nodeFromPosition.left;
    const diffYPosition = nodeToPosition.top - nodeFromPosition.top;
    return { diffXPosition, diffYPosition };
  }

  animation($droppableBelow, afterBefore) {
    this.getDiffVector($droppableBelow, this.$fixedDragNode);
    setTimeout(() => {
      if (afterBefore === 'after') $droppableBelow.after(this.$fixedDragNode);
      if (afterBefore === 'before') $droppableBelow.before(this.$fixedDragNode);
      this.$fixedDragNode.style.transform = `translate(0px,0px)`;
    }, 200);
  }
}
export default DragEvent;
