import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    useBuyDirectListing,
    useContract,
    Web3Button,
} from "@thirdweb-dev/react";
import { ListingType } from "@thirdweb-dev/sdk";
import "./Details.css";

const ERC1155ContractAddr = "0x0D3E82CC75045dD5AA114a1B0A53e01a99f4A68C";
const MarketplaceAddr = "0xe8ab090820BAf2B9E1518032D69B0a765bbc7474";
export default function Details() {

  const {id} = useParams();
  const [nfts, setNfts] = useState();
  const [loading, setLoading] = useState(true);

    const { contract } = useContract(MarketplaceAddr, "marketplace-v3");
    const { mutateAsync: buyDirectListing } = useBuyDirectListing(contract);


    // RENDERS DETAILS OF NFT IN CONTRACT
    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                },
            };

            try {
                const response = await fetch(
                    `https://testnets-api.opensea.io/v2/chain/goerli/contract/${ERC1155ContractAddr}/nfts/${id}`,
                    options
                );
                const data = await response.json();
                setNfts(data.nft);

                setLoading(false);
                console.log(data)
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);



    if (loading == true) {
        return (
            <div className="flex justify-center items-center py-3">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white-700"
                style={{ marginTop: "15%" }} /> 
            </div>
        )
    }

  return (
      <div className="Tab">
        <div>
        <h1 className="Name"> {nfts?.name}</h1> 
        <img className="Image" src={nfts?.image_url}/>
        </div>

        <div className="side-tab">
        <h1 className="Creator"> <b>Creador:</b> {nfts?.creator}</h1>
        <p className="Description"> <b>Sobre el evento:</b> {nfts?.description}</p>
        <span className="Quantity"> <b>Cantidad: </b> {nfts?.owners[0].quantity}</span>
        <span className="Quantity"> <b>ID: </b> {nfts?.identifier}</span>
        <br />
            <div style={{ textAlign: 'center' }}>
            <Web3Button
                    contractAddress={MarketplaceAddr}
                    action={() =>
                        buyDirectListing({
                            listingId: nfts.identifier, // ID of the listing to buy
                            quantity: "1",
                            buyer: "0xffe227D2451316f929c49444Fe3B7117639aa3A0", // Wallet to buy for
                        })
                    }
                >
                    Comprar ahora
                </Web3Button> 
            </div>
        </div>
    </div>
  )
}
