import React, { useState, useEffect } from "react";
// import { ethers } from "ethers";
import "../style.css"

const IndexPage = () => {

  const [disabled, setDisabled] = useState();

  // pide conectar una address de Metamask
  async function requestAccount() {
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return account;
  }

  useEffect(() => {
    async function checkActive() {
      const connection = await window.ethereum.selectedAddress;
      if(connection === undefined) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
    checkActive().catch(err => console.error(err))
  }, []);

  return (
    <main>
      <div className="container">
        <div className="brand-logo"></div>
        <div className="brand-title">Blockdemy Token</div>
        <div className="inputs">
          <button disabled={disabled} onClick={() => requestAccount()
            .then(() => setDisabled(true))
            .catch(err => console.error({ err }))}>Connect Wallet</button>
          <input disabled={!disabled} type="text" placeholder="example" />
          <button disabled={!disabled} type="submit">Example</button>
        </div>
      </div>
    </main>
  )
}

export default IndexPage
