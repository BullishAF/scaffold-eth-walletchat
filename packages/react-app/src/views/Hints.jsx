import React, { useState } from "react";
import { utils } from "ethers";
import { Button, Space, Divider } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { Address, AddressInput } from "../components";

export default function Hints({ yourLocalBalance, mainnetProvider, price, address }) {
  const [ownerAddr, setOwnerAddr] = useState("");
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  const handleButtonClick = () => {
    // Update the state with new values
    setOwnerAddr("0x17FA0A61bf1719D12C08c61F211A063a58267A19");
    setIsWidgetOpen(true);
  };

  return (
    <div>
      <div style={{ marginTop: 32, fontSize: 22 }}>
        Your ETH Balance: <b>{utils.formatEther(yourLocalBalance || 0)}</b>
      </div>

      <div style={{ marginTop: 32, fontSize: 20 }}>
        ETH current price: <b>${price}</b>
      </div>

      <div style={{ marginTop: 32 }}>
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          <Address address={address} minimized /> {address}
        </span>
      </div>

      <div>
        <Button type="primary">
          <FileSearchOutlined onClick={handleButtonClick} />
          Chat with Owner
        </Button>
      </div>

      <div style={{ marginTop: 32 }}>
        <span style={{ marginRight: 8 }}>💬</span>
        For questions or support visit
        <span
          className="highlight"
          style={{ marginLeft: 4, /* backgroundColor: "#f9f9f9", */ padding: 4, borderRadius: 4, fontWeight: "bolder" }}
        >
          <a target="_blank" rel="noopener noreferrer" href="https:walletchat.fun">
            WalletChat
          </a>
        </span>
      </div>
    </div>
  );
}
