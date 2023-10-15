import React, { useEffect, useState } from "react";
import { Tabs, Tab } from '@mui/material';
import "./Transactions.css";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

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
          "https://testnets-api.opensea.io/v2/chain/goerli/contract/0x04fC8b9a53daD619761ffCBC0bfc908b3C865491/nfts",
          options
        );
        const data = await response.json();
        setNfts(data.nfts);
      } catch (err) {
        console.error(err);
      }
    };

    const filterNfts = () => {
      if (selectedTab === "all") {
        return nfts;
      } 
      else if ("Musica" === selectedTab){
        console.log("mmg")
      }
    };
  
    const handleTabClick = (category) => {
      setSelectedTab(category);
    };

    fetchData();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
        <div className="GenreTabs">
        <div className={`GenreTab ${selectedTab === "all" ? "active" : ""}`} onClick={() => handleTabClick("all")} >
          Todos
        </div>
        <div className={`GenreTab ${selectedTab === "Musica" ? "active" : "google.com"}`} onClick={() => handleTabClick("Musica")}>
           Musica
        </div>
        <div className={`GenreTab ${selectedTab === "Cine" ? "active" : ""}`} onClick={() => handleTabClick("Cine")}>
          Cine
        </div>
        <div className={`GenreTab ${selectedTab === "Comedia" ? "active" : ""}`} onClick={() => handleTabClick("Comedia")} >
          Comedia
        </div>
        <div className={`GenreTab ${selectedTab === "Deporte" ? "active" : ""}`} onClick={() => handleTabClick("Deporte")} >
          Deporte
        </div>
      </div>

    

      <div className="card-display">
        {nfts.map((nft, index) => (
          <div className="card">
            <div className="container" key={nft?.identifier}>
            <Link to={`/nft/${nft?.identifier}`}>
              <h3 className="NftName">{nft?.name}</h3>
              <p className="NftDescription">{nft?.description}</p>
              <img className="NftImage" src={nft?.image_url} alt={nft?.name} />
           </Link>
              {/* <button className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]" onClick={() => alert("gracias")}> Buy </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
