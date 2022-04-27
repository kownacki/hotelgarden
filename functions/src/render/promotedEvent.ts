import {PromotedEventDbData} from '../../../utils/types';
import {listenToDb} from '../database';

const [promotedEventReady, getPromotedEventUnsafe] = listenToDb<PromotedEventDbData | undefined>('events/promoted');

export const getPromotedEvent = async () => {
  await promotedEventReady;
  return getPromotedEventUnsafe() || {uid: null};
}
