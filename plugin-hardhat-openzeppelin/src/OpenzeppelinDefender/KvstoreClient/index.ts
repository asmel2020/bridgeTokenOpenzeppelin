import { KeyValueStoreClient } from 'defender-kvstore-client';


export default class KvstoreClients {

  private client:KeyValueStoreClient;
 
  constructor() {
    this.client = new KeyValueStoreClient({ path: './secret.json'})
  }

  public async put(key: string, value: string) {
    return this.client.put(key,value)
  }
  
  public async get(key: string) {
    return this.client.get(key)
  }

  public async del(key: string) {
    return this.client.del(key)
  }
}
