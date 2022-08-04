import { SentinelClient,CreateSentinelRequest,} from 'defender-sentinel-client';
import { credentialClient } from '../models/type';
import { NotificationRequest,CreateNotificationRequest,UpdateNotificationRequest} from './models/types';

export default class SentinelClients {

  private client:SentinelClient

  constructor(credentialClient:credentialClient) {
    this.client = new SentinelClient(credentialClient);
  }
  public list() {
    return this.client.list();
  }
 
  public createNotificationChannel(CreateNotificationRequest:CreateNotificationRequest) {
    return this.client.createNotificationChannel(CreateNotificationRequest);
  }

  public listNotificationChannels() {
    return this.client.listNotificationChannels();
  }

  public getNotificationChannel(NotificationRequest:NotificationRequest) {
    return this.client.getNotificationChannel(NotificationRequest);
  }

  public updateNotificationChannel(UpdateNotificationRequest:UpdateNotificationRequest) {
    return this.client.updateNotificationChannel(UpdateNotificationRequest);
  }

  public deleteNotificationChannel(NotificationRequest:NotificationRequest) {
    return this.client.deleteNotificationChannel(NotificationRequest);
  }

  public create(CreateSentinelRequest:CreateSentinelRequest) {
    return this.client.create(CreateSentinelRequest);
  }

  public get(sentinelId:string) {
    return this.client.get(sentinelId);
  }

  public update(sentinelId: string,UpdateSubscriberRequest:any) {
    return this.client.update(sentinelId,UpdateSubscriberRequest);
  }

  public delete(sentinelId: string) {
    return this.client.delete(sentinelId);
  }

  public pause(sentinelId: string) {
    return this.client.pause(sentinelId);
  }

  public unpause(sentinelId: string) {
    return this.client.unpause(sentinelId);
  }
}
