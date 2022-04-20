export const findInvalidInputs = (fieldsData) => {
    return fieldsData.filter((fieldData) => !fieldData.valid);
};
// If required is false adds asterisk. Note: Asterisk added by mwc-textfield is 1px away.
export const keepLabelAsterisk = (label, required) => {
    return required ? label : `${label}*`;
};
