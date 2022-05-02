import {PromiseTrigger} from '../../utils/general';
import {db} from './database';

export type DataReady = Promise<unknown>;
export type GetData<Data> = () => Data;
export type Unsubscribe = () => void;
export type ListenToDbReturn<Data> = [DataReady, GetData<Data>, Unsubscribe];

export const listenToDoc = <Data>(doc: string, onData?: (data: Data) => void): ListenToDbReturn<Data> => {
  let data: Data;
  const dataReady = new PromiseTrigger();

  const unsubscribe = db.doc(doc).onSnapshot((doc) => {
    data = doc.data() as Data;
    dataReady.resolve();
    onData?.(data);
  });

  return [
    dataReady.promise,
    () => data,
    unsubscribe,
  ];
};
