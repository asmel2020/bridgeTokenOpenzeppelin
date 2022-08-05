import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, OpenzeppelinDefender } from "hardhat";
import * as fs from "fs";
import Result from "@ethersproject/abi";
describe("Lock", function () {
  describe("Transfers", function () {
    it("Should transfer the funds to the owner", async function () {
      //const inf = new ethers.utils.Interface(fs.readFileSync("./abis/BrigeToken.json", { encoding: "utf8", flag: "r" }).toString())
     
     
      console.log(await OpenzeppelinDefender.AutoTaskClint.list())

      
    });
  });
});
