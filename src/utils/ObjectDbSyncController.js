import {DbSyncController} from 'mkwc/DbSyncController.js';

export class ObjectDbSyncController extends DbSyncController {
  constructor(host, getObject, updateField, onDataReadyChange, onDataChange, options) {
    const updateObject = async (path, {fieldPath, newFieldData}, object) => {
      const oldFieldData = _.get(fieldPath, object);
      const updatedFieldData = await updateField(path, fieldPath, newFieldData, oldFieldData, object);
      // use freshest this.data until 'processing' is added and hope nothing serious happens
      return _.setWith(Object, fieldPath, updatedFieldData, this.data);
    };
    return super(
      host,
      getObject,
      updateObject,
      onDataReadyChange,
      onDataChange,
      options,
    );
  }
  async requestFieldUpdate(fieldPath, newFieldData) {
    return this.requestDataUpdate({fieldPath, newFieldData});
  }
}
