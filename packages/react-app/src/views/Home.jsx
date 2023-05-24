import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import React from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

  return (
    <div>
      <div style={{ margin: 32, fontSize: 22 }}>
        <span style={{ marginRight: 8 }}>🗣</span>
        Scaffold-ETH-WalletChat Example
      </div>

      <div style={{ margin: 32, fontSize: 20 }}>
        <span style={{ marginRight: 8 }}>📨</span>
        Head to the <Link to="/exampleui">Dashboard</Link> to update your status or interact with WalletChat.
      </div>

      <div style={{ margin: 32, fontSize: 20 }}>
        Visit the <a href="https://walletchat.fun">WalletChat</a> website for more information.
      </div>
    </div>
  );
}

export default Home;
