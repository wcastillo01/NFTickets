import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { Link } from "react-router-dom";
import { useValidDirectListings, useContract } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react"

const MarketplaceAddr = "0xe8ab090820BAf2B9E1518032D69B0a765bbc7474";
const Transactions = () => {
  const [nfts, setNfts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const { contract } = useContract(MarketplaceAddr, "marketplace-v3");

  const [isMusic, setMusic] = useState(false);
  const [isComedia, setComedia] = useState(false);
  
  const {
    data: directListings,
    isLoading,
    error,
  } = useValidDirectListings(contract);

  console.log({ directListings });

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

  return (
    <div>
        <div className="GenreTabs">
        <div className={`GenreTab ${selectedTab === "all" ? "active" : ""}`} onClick={() => handleTabClick("all")} >
          Todos
        </div>
        <div className={`GenreTab ${selectedTab === "Musica" ? "active" : "google.com"}`} onClick={() => setMusic(true)}>
           Musica
        </div>
        <div className={`GenreTab ${selectedTab === "Cine" ? "active" : ""}`} onClick={() => handleTabClick("Cine")}>
          Cine
        </div>
        <div className={`GenreTab ${selectedTab === "Comedia" ? "active" : ""}`} onClick={() => setComedia(true)} >
          Comedia
        </div>
        <div className={`GenreTab ${selectedTab === "Deporte" ? "active" : ""}`} onClick={() => handleTabClick("Deporte")} >
          Deporte
        </div>
      </div>

      {isMusic ? isComedia ? <div>mmg</div> : <div>mmg2</div> : <div>mmg3</div>}

      {directListings !== undefined && (
        <div>
            <div className="card-display">
              {directListings.map((directListing) => (
                <div className="card">
                  <div className="container" key={directListing.asset.id}>
                    <Link to={`/nft/${directListing.asset.id}`}>
                      <h3 className="NftName">{directListing.asset.name}</h3>
                      <p className="NftDescription">{directListing.asset.description}</p>
                      <img className="NftImage" src={directListing.asset.image} alt={directListing.asset.name} />
                    </Link>
                  </div>
                </div>
               ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
