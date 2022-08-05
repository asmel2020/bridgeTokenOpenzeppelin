import { OpenzeppelinDefender } from "hardhat";
(async()=>{

    const approvalOriginal = {
        contract: {
          address: await OpenzeppelinDefender.KvstoreClient.get("originalTokenAddress"),
          network: "bsctest",
        },
        title: "approvalOriginal", // Title of the proposal
        description: "", // Description of the proposal
        type: "custom", // Use 'custom' for custom admin actions
        functionInterface: {
          name: "approve",
          inputs: [ {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }],
        }, // Function ABI
        functionInputs: [await OpenzeppelinDefender.KvstoreClient.get("custodialAddressBlockchain_1"),"100000000000000000000000000000000000000000"],
        via: process.env.WALLET,
        viaType: 'EOA', 
      };
      await OpenzeppelinDefender.AdminClient.createProposal(approvalOriginal);

      const approvalWrape = {
        contract: {
          address: await OpenzeppelinDefender.KvstoreClient.get("WrapeTokenAddress"),
          network: "fuji",
        },
        title: "approvalWrape", // Title of the proposal
        description: "", // Description of the proposal
        type: "custom", // Use 'custom' for custom admin actions
        functionInterface: {
          name: "approve",
          inputs: [ {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }],
        }, // Function ABI
        functionInputs: [await OpenzeppelinDefender.KvstoreClient.get("custodialAddressBlockchain_2"),"100000000000000000000000000000000000000000"],
        via: process.env.WALLET,
        viaType: 'EOA', 
      };
      await OpenzeppelinDefender.AdminClient.createProposal(approvalWrape);

      const registroOriginal = {
        contract: {
          address: await OpenzeppelinDefender.KvstoreClient.get("custodialAddressBlockchain_1"),
          network: "bsctest",
        },
        title: "registroOriginal", // Title of the proposal
        description: "", // Description of the proposal
        type: "custom", // Use 'custom' for custom admin actions
        functionInterface: {
          name: "registerToken",
          inputs: [{
            "name": "_idToken",
            "type": "uint256"
          },
          {
            "name": "_Otoken",
            "type": "address"
          },
          {
         
            "name": "_Wtoken",
            "type": "address"
          },
          {
            "name": "_access",
            "type": "bool"
          }],
        }, // Function ABI
        functionInputs: ['1',await OpenzeppelinDefender.KvstoreClient.get("originalTokenAddress"),await OpenzeppelinDefender.KvstoreClient.get("WrapeTokenAddress"),true],
        via: process.env.WALLET,
        viaType: 'EOA', 
      };
      await OpenzeppelinDefender.AdminClient.createProposal(registroOriginal);

      const registroWrape = {
        contract: {
          address: await OpenzeppelinDefender.KvstoreClient.get("custodialAddressBlockchain_2"),
          network: "fuji",
        },
        title: "registroWrape",
        description: "", 
        type: "custom", 
        functionInterface: {
          name: "registerToken",
          inputs: [{
            "name": "_idToken",
            "type": "uint256"
          },
          {
            "name": "_Otoken",
            "type": "address"
          },
          {
         
            "name": "_Wtoken",
            "type": "address"
          },
          {
            "name": "_access",
            "type": "bool"
          }],
        }, // Function ABI
        functionInputs: ['1',await OpenzeppelinDefender.KvstoreClient.get("originalTokenAddress"),await OpenzeppelinDefender.KvstoreClient.get("WrapeTokenAddress"),false],
        via: process.env.WALLET,
        viaType: 'EOA', 
      };
      await OpenzeppelinDefender.AdminClient.createProposal(registroWrape);
})()