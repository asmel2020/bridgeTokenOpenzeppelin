import { AutotaskClient } from "defender-autotask-client";
import { credentialClient } from "../../types";

import {
  CreateAutotaskRequest,
  data,
  SourceFiles,
  UpdateAutotaskRequest,
} from "./models/types";

export default class AutotaskClients {
  private client: AutotaskClient;

  constructor(credentialClient: credentialClient) {
    this.client = new AutotaskClient(credentialClient);
  }
  //List
  public list() {
    return this.client.list();
  }
  //Utils
  public getEncodedZippedCodeFromFolder(code: string) {
    return this.client.getEncodedZippedCodeFromFolder(code);
  }
  //Create
  public create(CreateAutotaskRequest: CreateAutotaskRequest) {
    return this.client.create(CreateAutotaskRequest);
  }
  //Retrieve
  public get(autoTaskId: string) {
    return this.client.get(autoTaskId);
  }
  //Update
  public update(UpdateAutotaskRequest: UpdateAutotaskRequest) {
    return this.client.update(UpdateAutotaskRequest);
  }
  //Delete
  public delete(autoTaskId: string) {
    return this.client.delete(autoTaskId);
  }
  //Update Code
  public updateCodeFromFolder(autoTaskId: string, code: string) {
    return this.client.updateCodeFromFolder(autoTaskId, code);
  }

  public updateCodeFromSources(autoTaskId: string, code: SourceFiles) {
    return this.client.updateCodeFromSources(autoTaskId, code);
  }
  //Autotask Runs
  public runAutotask(autoTaskId: string, data: data) {
    return this.client.runAutotask(autoTaskId, data);
  }

  public listAutotaskRuns(autoTaskId: string) {
    return this.client.listAutotaskRuns(autoTaskId);
  }

  public getAutotaskRun(autoTaskRunId: string) {
    return this.client.getAutotaskRun(autoTaskRunId);
  }

}
