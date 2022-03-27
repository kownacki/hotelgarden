import {DbSyncController} from 'mkwc/DbSyncController.js';

export class ItemsDbSyncController extends DbSyncController {
  constructor(host, getItems, updateItem, onDataReadyChange, onDataChange, options) {
    const updatedItems = async (path, {index, newItemData}, items) => {
      const oldItem = items[index];
      const updatedItem = await updateItem(path, index, newItemData, oldItem, items);
      return {...items, [index]: updatedItem};
    };
    return super(
      host,
      getItems,
      updatedItems,
      onDataReadyChange,
      onDataChange,
      options,
    );
  }
  async requestItemUpdate(index, newItemData) {
    return this.requestDataUpdate({index, newItemData});
  }
}
