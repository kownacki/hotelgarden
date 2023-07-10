export const listItemsChangeTypeMap = {
    ITEM_INSERT: 'item-insert',
    ITEM_REMOVE: 'item-remove',
    ITEM_MOVE: 'item-move',
    ITEMS_SWAP: 'items-swap',
};
export const getSelectedIndexAfterInsert = (insertedIndex, currentSelectedIndex) => {
    if (insertedIndex <= currentSelectedIndex) {
        return currentSelectedIndex + 1;
    }
    return currentSelectedIndex;
};
export const getSelectedIndexAfterRemove = (removedIndex, currentSelectedIndex, listSizeBeforeRemove, strategy = 'select-previous') => {
    const isRemovedIndexLast = removedIndex === listSizeBeforeRemove - 1;
    if (removedIndex < currentSelectedIndex || (removedIndex === currentSelectedIndex && isRemovedIndexLast)) {
        return currentSelectedIndex - 1;
    }
    return currentSelectedIndex;
};
export const getSelectedIndexAfterItemSwap = (swappedIndex1, swappedIndex2, currentSelectedIndex) => {
    if (swappedIndex1 === currentSelectedIndex) {
        return swappedIndex2;
    }
    else if (swappedIndex2 === currentSelectedIndex) {
        return swappedIndex1;
    }
    return currentSelectedIndex;
};
export const getSelectedIndexAfterItemMove = (originIndex, destinationIndex, currentSelectedIndex, listSize) => {
    if (originIndex === currentSelectedIndex) {
        return destinationIndex;
    }
    let resultSelectedIndex = currentSelectedIndex;
    resultSelectedIndex = getSelectedIndexAfterRemove(originIndex, resultSelectedIndex, listSize);
    resultSelectedIndex = getSelectedIndexAfterInsert(destinationIndex, resultSelectedIndex);
    return resultSelectedIndex;
};
export const getSelectedIndexAfterChange = (currentSelectedIndex, listSizeAfterChange, changeType, changeData) => {
    // todo also handle insert not at the end
    if (changeType === listItemsChangeTypeMap.ITEM_INSERT) {
        return listSizeAfterChange - 1;
    }
    else if (changeType === listItemsChangeTypeMap.ITEM_REMOVE) {
        changeData = changeData;
        const previousListSize = listSizeAfterChange + 1;
        return getSelectedIndexAfterRemove(changeData.removedIndex, currentSelectedIndex, previousListSize);
    }
    else if (changeType === listItemsChangeTypeMap.ITEMS_SWAP) {
        changeData = changeData;
        return getSelectedIndexAfterItemSwap(changeData.swappedIndexes.index1, changeData.swappedIndexes.index2, currentSelectedIndex);
    }
    return currentSelectedIndex;
};
export const getSelectedDoubleListIndexAfterMove = (currentSelectedIndex, listSizesBeforeChange, { originIndex, destinationIndex, }) => {
    if (originIndex.listName === currentSelectedIndex.listName && originIndex.index === currentSelectedIndex.index) {
        return destinationIndex;
    }
    let resultSelectedIndex = currentSelectedIndex.index;
    if (currentSelectedIndex.listName === originIndex.listName) {
        resultSelectedIndex = getSelectedIndexAfterRemove(originIndex.index, resultSelectedIndex, listSizesBeforeChange[originIndex.listName]);
    }
    if (currentSelectedIndex.listName === destinationIndex.listName) {
        resultSelectedIndex = getSelectedIndexAfterInsert(destinationIndex.index, resultSelectedIndex);
    }
    return {
        index: resultSelectedIndex,
        listName: currentSelectedIndex.listName,
    };
};
export const getSelectedDoubleListIndexAfterChange = (currentSelectedIndex, listSizesBeforeChange, changeType, changeData) => {
    if (changeType === listItemsChangeTypeMap.ITEM_MOVE) {
        changeData = changeData;
        return getSelectedDoubleListIndexAfterMove(currentSelectedIndex, listSizesBeforeChange, changeData);
    }
    return currentSelectedIndex;
};
