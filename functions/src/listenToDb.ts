import {PromiseTrigger} from '../../utils/general';
import {db} from './database';

export type DataReady = Promise<unknown>;
export type GetData<Data> = () => Data;
export type Unsubscribe = () => void;
export type ListenToDbReturn<Data> = [DataReady, GetData<Data>, Unsubscribe];

export const listenToDoc = <Data>(doc: string, onData?: (data: Data) => void): ListenToDbReturn<Data> => {
  let data: Data;
  const dataReady = new PromiseTrigger();

  const unsubscribe = db.doc(doc).onSnapshot((docSnapshot) => {
    data = docSnapshot.data() as Data;
    dataReady.resolve();
    onData?.(data);
  });

  return [
    dataReady.promise,
    () => data,
    unsubscribe,
  ];
};

export const listenToCollection = <DocData>(collection: string, onData?: (docsData: DocData[]) => void): ListenToDbReturn<DocData[]> => {
  let docsData: DocData[];
  const dataReady = new PromiseTrigger();

  const unsubscribe = db.collection(collection).onSnapshot((querySnapshot) => {
    // Todo This is not optimised. Can only be used for small collections. Use docChanges if this is used for large collections
    docsData = querySnapshot.docs.map((doc) => doc.data()) as DocData[];
    dataReady.resolve();
    onData?.(docsData);
  });

  return [
    dataReady.promise,
    () => docsData,
    unsubscribe,
  ];
};
