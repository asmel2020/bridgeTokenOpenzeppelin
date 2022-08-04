import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the example field",async function () {
     
       await this.hre.OpenzeppelinDefender.KvstoreClient.put("hola",JSON.stringify({loca:'loca'}));
       const result:any =await this.hre.OpenzeppelinDefender.KvstoreClient.get("hola")
       const r= JSON.parse(result);
       console.log(r.loca)
    });

   
  });

 
});


