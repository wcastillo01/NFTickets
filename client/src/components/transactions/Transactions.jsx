import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Transactions.css";

const Transactions = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          // "X-API-KEY": "e4acf702d0764d778e6a7a9eab661aa0",
        },
      };

      try {
        const response = await fetch(
          "https://testnets-api.opensea.io/v2/chain/sepolia/contract/0xA14863622A070b26b58040C771Fb7dF782b939bf/nfts",
          options
        );
        const data = await response.json();
        setNfts(data.nfts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div>
        <div className="GenreTabs">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Todos" />
            <Tab label="Comedia" />
            <Tab label="Deporte" />
          </Tabs>
        </div>
        {/* {value === 0 && <div>Content for Windows tab</div>}
        {value === 1 && <div>Content for Linux tab</div>}
        {value === 2 && <div>Content for Mac tab</div>} */}
      </div>

      <div className="card-display">
        {nfts.map((nft, index) => (
          <div className="card">
            <div className="container" key={nft.identifier}>
              <h3 className="NftName">{nft.name}</h3>
              <p className="NftDescription">{nft.description}</p>
              <img className="NftImage" src={nft.image_url} alt={nft.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
