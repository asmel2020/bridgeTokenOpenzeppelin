import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
import "../style.css"

const IndexPage = () => {

  const [disabled, setDisabled] = useState();
  const [toNetwork, setToNetwork] = useState("AVAX");

  // pide conectar una address de Metamask
  async function requestAccount() {
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return account;
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      async function checkActive() {
        const connection = await window.ethereum._state.accounts;
        if(connection.length === 0) {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
    }
    checkActive().catch(err => console.error(err))
    }
  }, []);

  const handleOptionChange = (event) => {
    event.target.value === "BSC" ? setToNetwork("AVAX") : setToNetwork("BSC")
  }

  return (
    <main>
      <div className="container">
        <div className="brand-logo"></div>
        <div className="brand-title">Blockdemy Token Bridge</div>
        <div className="inputs">
        <button disabled={disabled} onClick={() => requestAccount()
            .then(() => setDisabled(true))
            .catch(err => console.error({ err }))}>Connect Wallet</button>
          <form>
            <label name="networksForm" >from:</label>
            <select onChange={(event) => handleOptionChange(event)}>
              <option value="BSC">BSC</option>
              <option value="AVAX">AVAX</option>
            </select>
            <label>to:</label>
            <p>{toNetwork}</p>
          </form>
          <input disabled={!disabled} min="0" type="number" placeholder="Amount" />
          <button disabled={!disabled} type="submit">Call Contract</button>
        </div>
      </div>
    </main>
  )
}

export default IndexPage
