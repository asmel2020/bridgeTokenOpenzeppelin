import {OpenzeppelinDefender } from "hardhat";
(async()=>{
    let map : { [key: string]: any} = {};
    map['custodialAddressBlockchain_1']=await OpenzeppelinDefender.KvstoreClient.get('custodialAddressBlockchain_1')
    map['custodialAddressBlockchain_2']=await OpenzeppelinDefender.KvstoreClient.get('custodialAddressBlockchain_2')
    map['apiKeyBlockchain_1']=await OpenzeppelinDefender.KvstoreClient.get('apiKeyBlockchain_1')
    map['apiSecretBlockchain_1']=await OpenzeppelinDefender.KvstoreClient.get('apiSecretBlockchain_1')
    map['apiKeyBlockchain_2']=await OpenzeppelinDefender.KvstoreClient.get('apiKeyBlockchain_2')
    map['apiSecretBlockchain_2']=await OpenzeppelinDefender.KvstoreClient.get('apiSecretBlockchain_2')
    map['PauseAutoTaskId_1']=await OpenzeppelinDefender.KvstoreClient.get('PauseAutoTaskId_1')
    map['PauseAutoTaskId_2']=await OpenzeppelinDefender.KvstoreClient.get('PauseAutoTaskId_2')
    map['adminApiKey']=process.env.API_KEY || ""
    map['adminApiSecret']=process.env.API_SECRET || ""
    map['originalTokenAddress']=await OpenzeppelinDefender.KvstoreClient.get('originalTokenAddress')
    map['WrapeTokenAddress']=await OpenzeppelinDefender.KvstoreClient.get('WrapeTokenAddress')

    const inyectSecretAutotaskId = await OpenzeppelinDefender.KvstoreClient.get('inyectSecretAutotaskId') || " "
    
   await OpenzeppelinDefender.AutoTaskClint.runAutotask(inyectSecretAutotaskId,map)


})()