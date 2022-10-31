export const getSelectedIndexAfterDelete = (deletedIndex, currentSelectedIndex, listSize, strategy = 'select-previous') => {
    if (deletedIndex < currentSelectedIndex || (deletedIndex === currentSelectedIndex && deletedIndex === listSize - 1)) {
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
