export const getSelectedIndexAfterDelete = (
  deletedIndex: number,
  currentSelectedIndex: number,
  listSize: number,
  strategy = 'select-previous',
) => {
  if (deletedIndex < currentSelectedIndex || (deletedIndex === currentSelectedIndex && deletedIndex === listSize - 1)) {
    return currentSelectedIndex - 1;
  } else {
    return currentSelectedIndex;
  }
};
