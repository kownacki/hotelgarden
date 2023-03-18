export type ListItemsChangeType = 'item-insert' | 'item-remove' | 'item-move'| 'items-swap';

export const listItemsChangeTypeMap: Record<string, ListItemsChangeType> = {
  ITEM_INSERT: 'item-insert',
  ITEM_REMOVE: 'item-remove',
  ITEM_MOVE: 'item-move',
  ITEMS_SWAP: 'items-swap',
};

export type ListItemsChangeDataInsert = {
  newItem: any,
};

export type ListItemsChangeDataRemove = {
  removedIndex: number,
};

export type ListItemsChangeDataSwap = {
  swappedIndexes: {
    index1: number,
    index2: number,
  },
};

export type ListItemsChangeData = ListItemsChangeDataInsert | ListItemsChangeDataRemove | ListItemsChangeDataSwap;

// double list types

export type DoubleListName = 'first' | 'second';

export type DoubleListIndex = {
  index: number,
  listName: DoubleListName,
};

export type DoubleListItemsChangeDataMove = {
  originIndex: DoubleListIndex,
  destinationIndex: DoubleListIndex,
};

export type DoubleListItemsChangeData = ListItemsChangeData | DoubleListItemsChangeDataMove;

export const getSelectedIndexAfterInsert = (
  insertedIndex: number,
  currentSelectedIndex: number,
) => {
  if (insertedIndex <= currentSelectedIndex) {
    return currentSelectedIndex + 1;
  }
  return currentSelectedIndex;
};

export const getSelectedIndexAfterRemove = (
  removedIndex: number,
  currentSelectedIndex: number,
  listSizeBeforeRemove: number,
  strategy = 'select-previous',
) => {
  const isRemovedIndexLast = removedIndex === listSizeBeforeRemove - 1;
  if (removedIndex < currentSelectedIndex || (removedIndex === currentSelectedIndex && isRemovedIndexLast)) {
    return currentSelectedIndex - 1;
  }
  return currentSelectedIndex;
};

export const getSelectedIndexAfterItemSwap = (
  swappedIndex1: number,
  swappedIndex2: number,
  currentSelectedIndex: number,
) => {
  if (swappedIndex1 === currentSelectedIndex) {
    return swappedIndex2;
  } else if (swappedIndex2 === currentSelectedIndex) {
    return swappedIndex1;
  }
  return currentSelectedIndex;
};

export const getSelectedIndexAfterItemMove = (
  originIndex: number,
  destinationIndex: number,
  currentSelectedIndex: number,
  listSize: number,
) => {
  if (originIndex === currentSelectedIndex) {
    return destinationIndex;
  }

  let resultSelectedIndex = currentSelectedIndex;
  resultSelectedIndex = getSelectedIndexAfterRemove(
    originIndex,
    resultSelectedIndex,
    listSize,
  );
  resultSelectedIndex = getSelectedIndexAfterInsert(
    destinationIndex,
    resultSelectedIndex,
  );
  return resultSelectedIndex;
};

export const getSelectedIndexAfterChange = (
  currentSelectedIndex: number,
  listSizeAfterChange: number,
  changeType: ListItemsChangeType,
  changeData: ListItemsChangeData,
): number => {
  // todo also handle insert not at the end
  if (changeType === listItemsChangeTypeMap.ITEM_INSERT) {
    return listSizeAfterChange - 1;
  }
  else if (changeType === listItemsChangeTypeMap.ITEM_REMOVE) {
    changeData = changeData as ListItemsChangeDataRemove;
    const previousListSize = listSizeAfterChange + 1;
    return getSelectedIndexAfterRemove(
      changeData.removedIndex,
      currentSelectedIndex,
      previousListSize,
    );
  }
  else if (changeType === listItemsChangeTypeMap.ITEMS_SWAP) {
    changeData = changeData as ListItemsChangeDataSwap;
    return getSelectedIndexAfterItemSwap(
      changeData.swappedIndexes.index1,
      changeData.swappedIndexes.index2,
      currentSelectedIndex,
    );
  }
  return currentSelectedIndex;
};

export const getSelectedDoubleListIndexAfterMove = (
  currentSelectedIndex: DoubleListIndex,
  listSizesBeforeChange: Record<DoubleListName, number>,
  {
    originIndex,
    destinationIndex,
  }: DoubleListItemsChangeDataMove,
) => {
  if (originIndex.listName === currentSelectedIndex.listName && originIndex.index === currentSelectedIndex.index) {
    return destinationIndex;
  }

  let resultSelectedIndex = currentSelectedIndex.index;
  if (currentSelectedIndex.listName === originIndex.listName) {
    resultSelectedIndex = getSelectedIndexAfterRemove(
      originIndex.index,
      resultSelectedIndex,
      listSizesBeforeChange[originIndex.listName],
    );
  }
  if (currentSelectedIndex.listName === destinationIndex.listName) {
    resultSelectedIndex = getSelectedIndexAfterInsert(
      destinationIndex.index,
      resultSelectedIndex,
    );
  }
  return {
    index: resultSelectedIndex,
    listName: currentSelectedIndex.listName,
  }
};

export const getSelectedDoubleListIndexAfterChange = (
  currentSelectedIndex: DoubleListIndex,
  listSizesBeforeChange: Record<DoubleListName, number>,
  changeType: ListItemsChangeType,
  changeData: DoubleListItemsChangeData,
): DoubleListIndex => {
  if (changeType === listItemsChangeTypeMap.ITEM_MOVE) {
    changeData = changeData as DoubleListItemsChangeDataMove;

    return getSelectedDoubleListIndexAfterMove(
      currentSelectedIndex,
      listSizesBeforeChange,
      changeData,
    );
  }
  return currentSelectedIndex;
};
