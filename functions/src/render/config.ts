import {ClientConfig} from '../../../utils/types';
import {listenToDoc} from '../database';

const [clientConfigReady, getClientConfigUnsafe] = listenToDoc<ClientConfig>('_config/client');

export const getClientConfig = async () => {
  await clientConfigReady;
  return getClientConfigUnsafe();
}
