import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch, Tooltip } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined, FileSearchOutlined } from "@ant-design/icons";
import { Address, Balance, Events } from "../components";
import { WalletChatWidget } from "react-wallet-chat-v0";
import "react-wallet-chat-v0/dist/index.css";
import { useContractReader } from "eth-hooks";

export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [newPurpose, setNewPurpose] = useState("loading...");
  const [widgetState, setWidgetState] = useState({
    chatAddr: "",
    isOpen: false,
  });

  const handleIconClick = () => {
    setWidgetState({
      ...widgetState,
      chatAddr: "0x445abac5658F99775a51bAD7916E0CF1273e2AdB",
      isOpen: true,
    });
  };

  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "2px solid #cccccc", padding: 12, width: 700, margin: "auto", marginTop: 64 }}>
        <h2>🗃 Dashboard</h2>
        <h4>Status: {purpose}</h4>
        <Divider />
        <div style={{ margin: 8 }}>
          <Input
            onChange={e => {
              setNewPurpose(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 8 }}
            onClick={async () => {
              /* look how you call setPurpose on your contract: */
              /* notice how you pass a call back for tx updates too */
              const result = tx(writeContracts.YourContract.setPurpose(newPurpose), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Update Status!
          </Button>
        </div>
        <h3>Contract Address:</h3>
        <Address
          address={readContracts && readContracts.YourContract ? readContracts.YourContract.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <Divider />
        <h3>Wallet Address:</h3>
        <Address address={address} ensProvider={mainnetProvider} fontSize={18} />
        <h3>Chat with Owner</h3>
        <div style={{ margin: 8, fontSize: 22 }}>
          <Tooltip title="Chat With Owner">
            <FileSearchOutlined onClick={handleIconClick} />
          </Tooltip>
        </div>
        <div className="main fade-in" style={{ position: "fixed", right: 5, bottom: 25 }}>
          <WalletChatWidget widgetState={widgetState} />
        </div>
        <Divider />
        {/* use utils.formatEther to display a BigNumber: */}
        <h3>Your ETH Balance: {yourLocalBalance ? utils.formatEther(yourLocalBalance) : "..."}</h3>
        <Balance address={address} provider={localProvider} price={price} /> USD
        <Divider />
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /* look how you call setPurpose on your contract: */
              tx(writeContracts.YourContract.setPurpose("🗣 Using WalletChat"));
            }}
          >
            Set Status to &quot;🗣 Using WalletChat&quot;
          </Button>
        </div>
        <div style={{ margin: 8 }}>
          <Button
            onClick={() => {
              /*
              you can also just craft a transaction and send it to the tx() transactor
              here we are sending value straight to the contract's address:
            */
              tx({
                to: writeContracts.YourContract.address,
                value: utils.parseEther("0.001"),
              });
              /* this should throw an error about "no fallback nor receive function" until you add it */
            }}
          >
            Send ETH
          </Button>
        </div>
      </div>

      {/*
        📑 Maybe display a list of events?
          (uncomment the event and emit line in YourContract.sol! )
      */}
      <Events
        contracts={readContracts}
        contractName="YourContract"
        eventName="SetPurpose"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      />
    </div>
  );
}
