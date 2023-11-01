import React, { useState, useEffect } from 'react';
import { useOwnedNFTs, useContract, useAddress } from "@thirdweb-dev/react";
const contractAddress = "0x0D3E82CC75045dD5AA114a1B0A53e01a99f4A68C";

export default function Owned() {
    const address = "dsa"//useAddress();
    const { contract } = useContract(contractAddress);
    const { data, isLoading, error } = useOwnedNFTs(contract, address);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (data === undefined) {
                setShowMessage(true);
            }
        }, 5000); // 5000 milliseconds (5 seconds)

        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div>
            {showMessage ? (
                <h1
                    style={{
                        fontSize: '3.5rem', // You can adjust the font size as needed
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                        width: '60%',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        
                    }}
                >
                    Lo sentimos, aun no tienes boletos para ningun evento. Compra alguno  <u><a href="/">aqui</a></u>
                </h1>
            ) : (
                data !== undefined && (
                    <div>
                        <div className="card-display">
                            {data.map((data) => (
                                <div className="card" key={data.metadata.id}>
                                    <div className="container">
                                        <h3 className="NftName">{data.metadata.name}</h3>
                                        <p className="NftDescription">{data.metadata.description}</p>
                                        <img className="NftImage" src={data.metadata.image} alt={data.metadata.name} />
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
