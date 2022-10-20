export const getSelectedIndexAfterDelete = (deletedIndex, currentSelectedIndex, listSize, strategy = 'select-previous') => {
    if (deletedIndex < currentSelectedIndex || (deletedIndex === currentSelectedIndex && deletedIndex === listSize - 1)) {
        return currentSelectedIndex - 1;
    }
    else {
        return currentSelectedIndex;
    }
};
