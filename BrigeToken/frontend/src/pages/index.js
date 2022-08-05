import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
// import { ethers } from "ethers";
import "../style.css";
import abis from "../abi/abi";

const IndexPage = () => {
  const [disabled, setDisabled] = useState();
  const [alertMessage, setAlertMessage] = useState("Alerta, mensaje de prueba");
  const [customAlert, setCustomAlert] = useState("none");
  const [fromNetwork, setFromNetwork] = useState("BSC");
  const [toNetwork, setToNetwork] = useState("AVAX");
  const [symbol, setSymbol] = useState("");
  const [botton, setBotton] = useState("");
  const [inputAmount, setInputAmount] = useState("");
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
      setCustomAlert("flex");
      setAlertMessage("Please install MetaMask!");
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
      setSymbol("tBNB");
      setFromNetwork("BSC");
      setToNetwork("AVAX");
      return ethers.utils.formatEther(
        await erc20.balanceOf(signer.getAddress())
      );
    } else if (chainId === "0xa869") {
      setSymbol("AVAX");
      setFromNetwork("AVAX");
      setToNetwork("BSC");
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
      const erc20 = new ethers.Contract(
        "0x3Ef32B1E5B8b2fF43DEEec56A05C079DDa239BF9",
        abis,
        signer
      );
      const result = await erc20.allowance(
        signer.getAddress(),
        custodiaOrigina
      );
      console.log(result);
      if (result.lt("1000000000000000000")) {
        setAllowance(false);
      } else {
        setAllowance(true);
      }
    } else if (chainId === "0xa869") {
      const erc20 = new ethers.Contract(tokenWrapper, abis, signer);
      const result = await erc20.allowance(
        signer.getAddress(),
        custodiaWrapper
      );

      if (result.lt("1000000000000000000")) {
        setAllowance(false);
      } else {
        setAllowance(true);
      }
    } else {
      setCustomAlert("flex");
      setAlertMessage("Blockchain no permitida, por favor cambie de red");
    }
  }

  async function approve() {
    if (chainId === "0x61") {
      const erc20 = new ethers.Contract(tokenOrigina, abis, signer);
      const result= await erc20.approve(
        custodiaOrigina,
        ethers.utils.parseUnits("10000000000000000000000000000000", "ether")
      );
      result.wait(4)
      setAllowance(true);
    } else if (chainId === "0xa869") {
      const erc20 = new ethers.Contract(tokenWrapper, abis, signer);
      const result=await erc20.approve(
        custodiaOrigina,
        ethers.utils.parseUnits("10000000000000000000000000000000", "ether")
      );
      result.wait(4)
      setAllowance(true);
    } else {
      setCustomAlert("flex");
      setAlertMessage("Blockchain no permitida, por favor cambie de red");
    }
  }

  async function postBrige() {
    if (chainId === "0x61") {
      // BSC
      const custodia = new ethers.Contract(custodiaOrigina, abis, signer);
      await custodia.brige("1", ethers.utils.parseUnits(inputAmount, "ether"));
    } else if (chainId === "0xa869") {
      // FUJI
      const custodia = new ethers.Contract(custodiaWrapper, abis, signer);
      await custodia.brige("1", ethers.utils.parseUnits(inputAmount, "ether"));
    } else {
      setCustomAlert("flex");
      setAlertMessage("Blockchain no permitida, por favor cambie de red");
    }
  }

  async function requestAccount() {
    const provider = new ethers.providers.Web3Provider(await detectMetamask());

    await detectChainId();

    await provider.send("eth_requestAccounts", []);

    setChainId(await provider.send("eth_chainId"));

    const signer = provider.getSigner();

    setSigner(signer);
    await bottons();
  }

  async function bottons() {
    if (allowance) {
      setBotton(
        <button disabled={!disabled} type="submit" onClick={(e) => approve(e)}>
          Approve
        </button>
      );
    } else {
      setBotton(
        <button
          disabled={!disabled}
          type="submit"
          onClick={(e) => {
            postBrige(e);
          }}
        >
          Call Contract
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
    detectMetamask();
  }, []);

  const dismissAlert = () => {
    setCustomAlert("none");
  };

  const handleChange = (e) => {
    setInputAmount(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (allowance) {
      await postBrige();
    } else {
      await approve();
    }
  };

  return (
    <main>
      <div className="container">
        <div className="brand-logo"></div>
        <div className="brand-title">Blockdemy Token Bridge</div>
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
          <form onSubmit={handleSubmit}>
            <label name="networksForm">from:</label>
            <p>{fromNetwork}</p>
            <label>to:</label>
            <p>{toNetwork}</p>
            <input
              disabled={!disabled}
              min="0"
              type="number"
              placeholder="Amount"
              value={inputAmount}
              onChange={handleChange}
            />
            <p id="balance">
              Balance: {balance} {}{" "}
            </p>
            <button disabled={!disabled} type="submit">
              {allowance ? "Call Contract" : "Approve"}
            </button>
          </form>
        </div>
      </div>
      <div id="alert_container" style={{ display: `${customAlert}` }}>
        <div id="alert">
          <p id="alert_text">{alertMessage}</p>
          <button id="alert_button" onClick={() => dismissAlert()}>
            OK
          </button>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
