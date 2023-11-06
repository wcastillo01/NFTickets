import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { Link } from "react-router-dom";
import { useValidDirectListings, useContract } from "@thirdweb-dev/react";

const MarketplaceAddr = "0x3F4B384A7a8dE244434f3d82475304Dd1cEc4681";
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

  console.log({ directListings }); //TESTING TO SHOW DATA IN CONSOLE

  const handleTabClick = (category) => {
    setSelectedTab(category);
  };

  return (
    <div>
      <div style={{ display: "flex", color: "white" }}>
        <div className="GenreTabs white-glassmorphism">
          <div
            className={`GenreTab ${selectedTab === "all" ? "active" : ""}`}
            onClick={() => handleTabClick("all")}
          >
            Todos
          </div>
          <div
            className={`GenreTab ${
              selectedTab === "Musica" ? "active" : "google.com"
            }`}
            onClick={() => setMusic(true)}
          >
            Musica
          </div>
          <div
            className={`GenreTab ${selectedTab === "Cine" ? "active" : ""}`}
            onClick={() => handleTabClick("Cine")}
          >
            Cine
          </div>
          <div
            className={`GenreTab ${selectedTab === "Comedia" ? "active" : ""}`}
            onClick={() => setComedia(true)}
          >
            Comedia
          </div>
          <div
            className={`GenreTab ${selectedTab === "Deporte" ? "active" : ""}`}
            onClick={() => handleTabClick("Deporte")}
          >
            Deporte
          </div>
        </div>
      </div>

      {directListings !== undefined && (
        <div>
          <div className="card-display">
            {directListings.map((directListing) => (
              <div
                key={directListing.asset.id}
                className="card white-glassmorphism"
              >
                <div className="container">
                  <Link to={`/nft/${directListing.asset.id}`}>
                    <h3 className="NftName">{directListing.asset.name}</h3>
                    <p className="NftDescription text-justify">
                      {directListing.asset.description}
                    </p>
                    <img
                      className="NftImage"
                      src={directListing.asset.image}
                      alt={directListing.asset.name}
                    />
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
