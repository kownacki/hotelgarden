export var SendMessageRequestBodySubject;
(function (SendMessageRequestBodySubject) {
    SendMessageRequestBodySubject["HOTEL"] = "hotel";
    SendMessageRequestBodySubject["GASTRO"] = "gastro";
    SendMessageRequestBodySubject["CAREERS"] = "careers";
})(SendMessageRequestBodySubject || (SendMessageRequestBodySubject = {}));
const subjectLabelsMap = {
    [SendMessageRequestBodySubject.HOTEL]: 'Hotel',
    [SendMessageRequestBodySubject.GASTRO]: 'Gastronomia',
    [SendMessageRequestBodySubject.CAREERS]: 'Praca',
};
export const getSubjectLabel = (subject) => {
    return subjectLabelsMap[subject];
};
