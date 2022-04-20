export interface FieldData {
  name: string,
  value: any,
  input: Element,
  valid: boolean,
  reportValidity: () => boolean,
}

export const findInvalidInputs = (fieldsData: FieldData[]) => {
  return fieldsData.filter((fieldData) => !fieldData.valid);
}

// If required is false adds asterisk. Note: Asterisk added by mwc-textfield is 1px away.
export const keepLabelAsterisk = (label: string, required: boolean) => {
  return required ? label : `${label}*`;
}
