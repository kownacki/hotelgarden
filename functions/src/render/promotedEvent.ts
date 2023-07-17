import {PromotedEventDbData} from '../../utils/types';
import {listenToDoc} from '../database';

const [promotedEventReady, getPromotedEventUnsafe] = listenToDoc<PromotedEventDbData | undefined>('events/promoted');

export const getPromotedEvent = async () => {
  await promotedEventReady;
  return getPromotedEventUnsafe() || {uid: null};
}
