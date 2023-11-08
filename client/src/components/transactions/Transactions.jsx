import React, { useEffect, useState } from "react";
import "./Transactions.css";
import { Link } from "react-router-dom";
import { useValidDirectListings, useContract } from "@thirdweb-dev/react";

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

  const [searchQuery, setSearchQuery] = useState("");

  // console.log(directListings); //TESTING TO SHOW DATA IN CONSOLE

  const handleTabClick = (category) => {
    setSelectedTab(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchedListings = directListings?.filter((l) =>
    l.asset.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <div>
          <input
            className="rounded-lg SearchBar"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Buscar..."
          />
        </div>
        <div className="flex justify-center items-center py-3">
          <div
            className="animate-spin rounded-full h-32 w-32 border-b-2 border-white-700"
            style={{ marginTop: "15%" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <input
          className="rounded-lg SearchBar"
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar..."
        />
      </div>
      <div style={{ display: "flex", color: "white" }}></div>

      {searchedListings?.length > 0 ? (
        <div>
          <div className="card-display">
            {searchedListings.map((directListing) => (
              <div
                key={directListing.asset.id}
                className="card white-glassmorphism"
              >
                <div className="container">
                  <Link to={`/nft/${directListing.asset.id}`}>
                    <h3 className="NftName">{directListing.asset.name}</h3>
                    <p className="NftDescription font-light text-justify">
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
      ) : (
        <div className="text-4xl text-white font-bold mt-8 mb-16 text-center ">
          No hay resultados
        </div>
      )}
    </div>
  );
};

export default Transactions;
