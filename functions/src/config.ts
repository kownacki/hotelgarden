import {db} from './database';
import {ClientConfig} from './types';

let clientConfig: ClientConfig;
let resolveClientConfigReady: (value?: unknown) => void;
export const clientConfigReady = new Promise((resolve) => resolveClientConfigReady = resolve);

db.doc('_config/client').onSnapshot((doc) => {
  clientConfig = doc.data() as ClientConfig;
  resolveClientConfigReady();
});

export const getClientConfig = async () => {
  await clientConfigReady;
  return clientConfig;
}
