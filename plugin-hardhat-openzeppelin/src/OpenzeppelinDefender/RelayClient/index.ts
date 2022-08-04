import { RelayClient,CreateRelayerRequest,UpdateRelayerRequest } from 'defender-relay-client';
import { credentialClient } from "../../types";



export default class RelayClients {
  
  private client: RelayClient;

  constructor(credentialClient: credentialClient) {
    this.client = new RelayClient(credentialClient);
  }

  public create(CreateRelayerRequest:CreateRelayerRequest) {
    return  this.client.create(CreateRelayerRequest);
  } 

  public createKey(apiKey:string) {
    return  this.client.createKey(apiKey);
  }

  public get(apiKey:string) {
    return  this.client.get(apiKey);
  }

  public list() {
    return this.client.list();
  }

  public listKeys(apiKey:string) {
    return this.client.listKeys(apiKey);
  }

  public update(apiKey:string,UpdateRelayerRequest:UpdateRelayerRequest) {
    return this.client.update(apiKey, UpdateRelayerRequest);
  }

  public deleteKey(apiKey:string,keyId:string) {
    return this.client.deleteKey(apiKey,keyId);
  }
}