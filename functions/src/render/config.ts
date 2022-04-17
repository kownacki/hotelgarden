import {ClientConfig} from '../../../utils/types';
import {listenToDb} from '../database';

const [clientConfigReady, getClientConfigUnsafe] = listenToDb<ClientConfig>('_config/client');

export const getClientConfig = async () => {
  await clientConfigReady;
  return getClientConfigUnsafe();
}
