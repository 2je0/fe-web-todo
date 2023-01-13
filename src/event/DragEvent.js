import PropertyFinder from '../util/PropertyFinder.js';

class DragEvent {
  DELAY = 400;
  timer = null;
  isPress = false;
  transferCardFn;
  $currentDroppable = null;
  isCurrentSideUpper = true;
  $draggingNode;
  $fixedDragNode;

  constructor(transferCardFn) {
    this.transferCardFn = transferCardFn;
  }

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
    const dargTargetProperty = new PropertyFinder(event.target);
    const {
      cardContainer: $fixedDragNode,
      columnIdx: oldcolumnIdx,
      cardIdx: oldcardIdx,
    } = dargTargetProperty.getAllProperty();
    this.$fixedDragNode = $fixedDragNode;
    this.$draggingNode = this.getDraggingNode($fixedDragNode);
    this.draggingNodeMoveAt(event.pageX, event.pageY);
    const onMouseMoveCallBack = this.onMouseMove.bind(this);
    document.addEventListener('mousemove', onMouseMoveCallBack);

    this.$draggingNode.addEventListener('mouseup', () => {
      const { columnIdx: newColumnIdx, cardIdx: newCardIdx } =
        this.getIdxOfFixedDragNode();
      document.removeEventListener('mousemove', onMouseMoveCallBack);

      const fixedDragNodePosition = this.$fixedDragNode.getBoundingClientRect();
      const draggingNodePosition = this.$draggingNode.getBoundingClientRect();
      const diffXPosition =
        fixedDragNodePosition.left - draggingNodePosition.left;
      const diffYPosition =
        fixedDragNodePosition.top - draggingNodePosition.top;
      this.$draggingNode.style.transform = `translate(${diffXPosition}px,${diffYPosition}px)`;
      this.$draggingNode.style.transitionDuration = '1s';
      setTimeout(() => {
        this.removeBothDragNode();
        this.transferCardFn(oldcolumnIdx, oldcardIdx, newColumnIdx, newCardIdx);
      }, 1000);
    });
  }

  removeBothDragNode() {
    this.$draggingNode.onmouseup = null;
    this.$fixedDragNode.remove();
    this.$draggingNode.remove();
  }

  getIdxOfFixedDragNode() {
    const pointTobeDropped = document.querySelector('.dragging-fix');
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
    if (this.$currentDroppable !== $droppableBelow) {
      this.$currentDroppable = $droppableBelow;
    }
    if (this.$currentDroppable === $droppableBelow) {
      if (this.isCurrentSideUpper === isUpperSide) return;
      this.isCurrentSideUpper = isUpperSide;
      if (isUpperSide)
        $droppableBelow.previousElementSibling.insertAfter(this.$fixedDragNode);
      else $droppableBelow.insertAfter(this.$fixedDragNode);
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
}
export default DragEvent;
