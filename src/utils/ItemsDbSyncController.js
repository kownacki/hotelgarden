import {DbSyncController} from 'mkwc/DbSyncController.js';

const UpdateType = {
  SINGLE_ITEM: 'SINGLE_ITEM',
  ALL_ITEMS: 'ALL_ITEMS',
};

export class ItemsDbSyncController extends DbSyncController {
  constructor(host, {getItems, updateItem, updateAllItems, ...restProps}, options) {
    const updateDataSingleItem = async (path, index, newItemData, oldItems) => {
      const oldItem = oldItems[index];
      const updatedItem = await updateItem(path, index, newItemData, oldItem, oldItems);
      return {...oldItems, [index]: updatedItem};
    }
    const updateDataAllItems = async (path, newItemsData) => {
      return await updateAllItems(path, newItemsData);
    };
    const updateItems = (path, {type, index, data}, items) => {
      if (type === UpdateType.SINGLE_ITEM) {
        return updateDataSingleItem(path, index, data, items)
      }
      // type === UpdateType.ALL_ITEMS
      return updateDataAllItems(path, data);
    };

    return super(
      host,
      {
        getData: getItems,
        updateData: updateItems,
        ...restProps,
      },
      options,
    );
  }
  async requestAllItemsUpdate(newItemsData) {
    return this.requestDataUpdate({type: UpdateType.ALL_ITEMS, data: newItemsData});
  }
  async requestItemUpdate(index, newItemData) {
    return this.requestDataUpdate({type: UpdateType.SINGLE_ITEM, index, data: newItemData});
  }
}
