import {DbSyncController} from 'mkwc/DbSyncController.js';

export class ItemsDbSyncController extends DbSyncController {
  constructor(host, getItems, updateItem, onDataReadyChange, onDataChange, options) {
    const updatedItems = async (itemsPath, {itemIndex, newItemData}, items) => {
      const oldItem = items[itemIndex];
      const updatedItem = await updateItem({itemsPath, itemIndex}, newItemData, oldItem, items);
      return {...items, [itemIndex]: updatedItem};
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
  requestItemUpdate(itemIndex, newItemData) {
    return this.requestDataUpdate({itemIndex, newItemData});
  }
}
