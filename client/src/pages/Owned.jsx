import React, { useState, useEffect } from "react";
import { useOwnedNFTs, useContract, useAddress } from "@thirdweb-dev/react";
const ERC1155ContractAddr = "0xb612375913D4bA5d72aa21Cf6567B8BA8724F8Cb";

export default function Owned() {
  const address = useAddress();
  const { contract } = useContract(ERC1155ContractAddr);
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log({ data });
  console.log({ isLoading });

  useEffect(() => {
    let timer;

    if (data !== undefined) {
      setLoading(false);
    } else {
      timer = setTimeout(() => {
        setShowMessage(true);
        setLoading(false);
      }, 5000); // 5000 milliseconds (5 seconds)
    }
    
  

    return () => clearTimeout(timer);
  }, [data]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-3">
        <div
          className="animate-spin rounded-full h-32 w-32 border-b-2 border-white-700"
          style={{ marginTop: "15%" }}
        />
      </div>
    );
  }

  return (
    <div>
      {showMessage ? (
        <h1
          style={{
            fontSize: "3.5rem", // You can adjust the font size as needed
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            width: "60%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Lo sentimos, aun no tienes boletos para ningun evento. Compra alguno{" "}
          <u>
            <a href="/">aqui</a>
          </u>
        </h1>
      ) : (
        data !== undefined && (
          <div>
            <h1 className="text-4xl text-white font-bold mt-8 mb-16 text-center ">
              Estos son los tickets que tienes disponibles:
            </h1>
            <div className="card-display">
              {data.map((data) => (
                <div
                  className="card white-glassmorphism"
                  key={data.metadata.id}
                >
                  <div className="container">
                    <h3 className="NftName">{data.metadata.name}</h3>
                    <p className="NftDescription">
                      {data.metadata.description}
                    </p>
                    <img
                      className="NftImage"
                      src={data.metadata.image}
                      alt={data.metadata.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}
