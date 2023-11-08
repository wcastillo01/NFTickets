import React from 'react'
import { useOwnedNFTs, useContract, useAddress } from "@thirdweb-dev/react";


const contractAddress = "0x0D3E82CC75045dD5AA114a1B0A53e01a99f4A68C";
export default function Reviews() {
    const address = "0xffe227D2451316f929c49444Fe3B7117639aa3A0";
    const { contract } = useContract(contractAddress);
    const { data, isLoading, error } = useOwnedNFTs(contract, address);

    console.log({ data });
    return (
        <div>
            <h1 className="text-4xl font-bold mb-16 mt-8 text-center text-white">
                Tu opinion es importante. Dejanos saber que piensas!
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', }}>
                <iframe
                    width="800px"
                    height="600px"
                    src="https://forms.office.com/Pages/ResponsePage.aspx?id=CK8XQOGiqk2RgFs7yO6E-oh_SuOz6VBBmwaolsiMWmRUNDI5NkFRWVZVUVdDSFVJOUhKSUg4TFc4QS4u&embed=true"
                    style={{ border: 'none', maxWidth: '100%' }}
                    allowFullScreen
                    webkitAllowFullScreen
                    mozAllowFullScreen
                    msAllowFullScreen
                ></iframe>
            </div>

        </div>
    )
}