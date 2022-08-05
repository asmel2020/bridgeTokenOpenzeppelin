import React, { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
// import { ethers } from "ethers";
import "../style.css";
import abis from "../abi/abi";

const IndexPage = () => {
  const [disabled, setDisabled] = useState();
  const [toNetwork, setToNetwork] = useState("AVAX");
  const [botton, setBotton] = useState("");
  const [amount, setAmount] = useState(0);
  const [signer, setSigner] = useState();
  const [chainId, setChainId] = useState();
  const [balance, setBalance] = useState();
  const [allowance, setAllowance] = useState(false);
  const [tokenOrigina, setTokenOriginal] = useState(
    "0x3Ef32B1E5B8b2fF43DEEec56A05C079DDa239BF9"
  );
  const [tokenWrapper, setTokenWrapper] = useState(
    "0xc1d0A5aD7e669F9a9346E0A336caCC3Db7E883fa"
  );
  const [custodiaOrigina, setCustodiaOriginal] = useState(
    "0xB1B7918d6C79611157E251cad43B4ea722C9f3C7"
  );
  const [custodiaWrapper, setCustodiaWrapper] = useState(
    "0xB34502Bb06e8cAd033FADf1bB23baFBEa789D195"
  );

  async function detectMetamask() {
    const provider = await detectEthereumProvider();

    if (provider) {
      return provider;
    } else {
      alert("Please install MetaMask!");
    }
  }

  async function detectChainId() {
    window.ethereum.on("chainChanged", (chainId) => {
      requestAccount().then(() => {
        setChainId(chainId);
      });
    });
  }

  async function consultBalance(signer) {
    if (chainId === "0x61") {
      const erc20 = new ethers.Contract(tokenOrigina, abis, signer);
      return ethers.utils.formatEther(
        await erc20.balanceOf(signer.getAddress())
      );
    } else if (chainId === "0xa869") {
      const erc20 = new ethers.Contract(tokenWrapper, abis, signer);
      return ethers.utils.formatEther(
        await erc20.balanceOf(signer.getAddress())
      );
    } else {
      return "0";
    }
  }

  async function consultAllowance(signer) {
    if (chainId === "0x61") {
      const erc20 = new ethers.Contract(tokenOrigina, abis, signer);
      const result = await erc20.allowance(
        custodiaOrigina,
        signer.getAddress()
      );
      if (result.lt("1000000000000000000")) {
        setAllowance(false);
      } else {
        setAllowance(true);
      }
    } else if (chainId === "0xa869") {
      const erc20 = new ethers.Contract(tokenWrapper, abis, signer);
      const result = await erc20.allowance(
        custodiaWrapper,
        signer.getAddress()
      );

      if (result.lt("1000000000000000000")) {
        setAllowance(false);
      } else {
        setAllowance(true);
      }
    } else {
      alert("blockchain no permitida por favor cambie de red");
    }
  }

  async function approve() {
    if (chainId === "0x61") {
      const erc20 = new ethers.Contract(tokenOrigina, abis, signer);
      await erc20.approve(
        custodiaOrigina,
        ethers.utils.parseUnits("1000000000000000000000000", "ether")
      );
      erc20.wait(4);
    } else if (chainId === "0xa869") {
      const erc20 = new ethers.Contract(tokenWrapper, abis, signer);
      await erc20.approve(
        custodiaOrigina,
        ethers.utils.parseUnits("1000000000000000000000000", "ether")
      );
      erc20.wait(4);
    } else {
      alert("blockchain no permitida por favor cambie de red");
    }
  }

  async function postBrige(amount) {
    if (chainId === "0x61") {
      const custodia = new ethers.Contract(custodiaOrigina, abis, signer);
      await custodia.brige("1", ethers.utils.parseUnits(amount, "ether"));
    } else if (chainId === "0xa869") {
      const custodia = new ethers.Contract(custodiaWrapper, abis, signer);
      await custodia.brige("1", ethers.utils.parseUnits("1000", "ether"));
    } else {
      alert("blockchain no permitida por favor cambie de red");
    }
  }

  async function requestAccount() {
    const provider = new ethers.providers.Web3Provider(await detectMetamask());

    await detectChainId();

    await provider.send("eth_requestAccounts", []);

    setChainId(await provider.send("eth_chainId"));

    const signer = provider.getSigner();

    setSigner(signer);
  }

  async function bottons() {

    if (allowance) {
      setBotton(
        <button
          disabled={!disabled}
          type="submit"
          onClick={() => {
            postBrige(amount);
          }}
        >
          Call Contract
        </button>
      );
    }else{
      setBotton(
        <button
          disabled={!disabled}
          type="submit"
          onClick={() => {
            postBrige(amount);
          }}
        >
          Approval
        </button>
      );
    }
  }

  useEffect(() => {
    if (!chainId) {
    } else {
      consultBalance(signer)
        .then((e) => {
          setBalance(e);
        })
        .catch();
      consultAllowance(signer).then();
      bottons().then();
    }
  }, [chainId]);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      async function checkActive() {
        const connection = await window.ethereum._state.accounts;
        if (connection.length === 0) {
          setDisabled(false);
          bottons().then();
        } else {
          requestAccount();
          bottons().then();
          setDisabled(true);
        }
      }
      checkActive().catch((err) => console.error(err));
    }
  }, []);

  const handleOptionChange = (event) => {
    event.target.value === "BSC" ? setToNetwork("AVAX") : setToNetwork("BSC");
  };

  return (
    <main>
      <div className="container">
        <div className="brand-logo"></div>
        <div className="brand-title">
          Blockdemy Token Bridge / balance :{balance}
        </div>
        <div className="inputs">
          <button
            disabled={disabled}
            onClick={() =>
              requestAccount()
                .then(() => setDisabled(true))
                .catch((err) => console.error({ err }))
            }
          >
            Connect Wallet
          </button>
          <form>
            <label name="networksForm">from:</label>
            <select onChange={(event) => handleOptionChange(event)}>
              <option value="BSC">BSC</option>
              <option value="AVAX">AVAX</option>
            </select>
            <label>to:</label>
            <p>{toNetwork}</p>
          </form>
          <input
            disabled={!disabled}
            min="0"
            type="number"
            placeholder="Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
           <button
          disabled={!disabled}
          type="submit"
          onClick={() => {
            postBrige(amount);
          }}
        >
          Call Contract
        </button>
      
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
