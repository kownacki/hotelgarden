export enum SendMessageRequestBodySubject {
  HOTEL = 'hotel',
  GASTRO = 'gastro',
  CAREERS = 'careers',
}

export interface SendMessageRequestBody {
  subject: SendMessageRequestBodySubject,
  name: string,
  company: string,
  phone: string,
  email: string,
  text: string,
}

const subjectLabelsMap: Record<SendMessageRequestBodySubject, string> = {
  [SendMessageRequestBodySubject.HOTEL]: 'Hotel',
  [SendMessageRequestBodySubject.GASTRO]: 'Gastronomia',
  [SendMessageRequestBodySubject.CAREERS]: 'Praca',
};

export const getSubjectLabel = (subject: SendMessageRequestBodySubject) => {
  return subjectLabelsMap[subject];
};
