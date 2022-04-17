import {db} from './database';

export type DataReady = Promise<unknown>;
export type GetData<Data> = () => Data;
export type Unsubscribe = () => void;
export type ListenToDbReturn<Data> = [DataReady, GetData<Data>, Unsubscribe];

export const listenToDb = <Data>(doc: string, onData?: (data: Data) => void): ListenToDbReturn<Data> => {
  let data: Data;
  let resolveDataReady: (value?: unknown) => void;
  const dataReady = new Promise((resolve) => resolveDataReady = resolve);

  const unsubscribe = db.doc(doc).onSnapshot((doc) => {
    data = doc.data() as Data;
    resolveDataReady();
    onData?.(data);
  });

  return [
    dataReady,
    () => data,
    unsubscribe,
  ];
};
