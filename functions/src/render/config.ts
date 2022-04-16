import {ClientConfig} from '../../../utils/types';
import {listenToDb} from '../database';

const [getClientConfigUnsafe, clientConfigReady] = listenToDb<ClientConfig>('_config/client');

export const getClientConfig = async () => {
  await clientConfigReady;
  return getClientConfigUnsafe();
}
