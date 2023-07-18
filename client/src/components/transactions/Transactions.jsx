import React, { useEffect, useState } from "react";
import "./Transactions.css"


const Transactions = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": "e4acf702d0764d778e6a7a9eab661aa0",
        },
      };

      try {
        const response = await fetch(
          "https://api.opensea.io/v2/chain/ethereum/contract/0x009c5b7fF119972e3437b51C4F94ADDB8DBB2bCd/nfts",
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

  // Rest of your component code

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {nfts.map((nft, index) => (
        <div key={nft.identifier} style={{ flex: "0 0 25%", padding: "10px" }}>
          <h3 className="NftName">{nft.name}</h3>
          <p>{nft.description}</p>
          <img src={nft.image_url} alt={nft.name} />
        </div>
      ))}
    </div>
  );
};

export default Transactions;
