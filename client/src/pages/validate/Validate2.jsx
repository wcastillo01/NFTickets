import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useAddress, useContract, } from "@thirdweb-dev/react";
import axios from "axios";
import "./validate.css";

const ERC1155ContractAddr = "0x0D3E82CC75045dD5AA114a1B0A53e01a99f4A68C";
const MarketplaceAddr = "0xe8ab090820BAf2B9E1518032D69B0a765bbc7474";

export default function Details() {
    const [nfts, setNfts] = useState(null); // Initialize as null
    const [owner, setOwner] = useState(null); // Initialize as null
    const address = useAddress()?.toLowerCase();
    const [scanResult, setScanResult] = useState(null);
    const [quantity, setQuantity] = useState(0); // Initialize as null


    useEffect(() => {

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 350,
                height: 350
            },
            fps: 10,
        });
        scanner.render(sucess);

        function sucess(result) {
            test();
            scanner.clear();
            setScanResult(result.toLowerCase());
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://testnets-api.opensea.io/v2/chain/goerli/contract/${ERC1155ContractAddr}/nfts/3`
                );
                const data = response.data;

                console.log(data);
                setNfts(data.nft);
                if (data.nft.owners) {
                    setOwner(data.nft.owners);
                }


            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    function test() {
        if (owner !== null && scanResult !== null) { 
            for (let i = 0; i < owner.length; i++) {
                if (scanResult === owner[i].address) {
                    console.log("Address matched with quantity: " + owner[i].quantity);
                    return true; 
                }
            }
        }
        console.log("No matching address found.");
        return false;
    }

    return (
        <div>
            <div style={{width: '40%', minWidth: '300px', margin: '0 auto', marginTop: '2%', color: 'white'}}>
                {scanResult
                ? (<div>

                    {test() 
                    ? (<div>
                        <div className="back">
                            <div className="check"></div>
                        </div>
                        <button style={{ marginTop: '5%' }} className="button text-black"> Test another one</button>  
                       </div>) 
                    : (<div>
                        <div className="close"></div>
                        <button style={{marginTop: '5%'}} className="button text-black"> Test another one</button>  
                    </div>)}
                 </div>)
                : (<div id="reader"></div>)}  
                
            </div>        
        </div>
    );
}
