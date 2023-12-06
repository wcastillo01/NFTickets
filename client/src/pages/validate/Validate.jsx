import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useAddress, useContract, } from "@thirdweb-dev/react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./validate.css";

const ERC1155ContractAddr = "0xcdc33713EC1Cc323e4CC2B23Ae2f90ecabB511Df";
const MarketplaceAddr = "0xbF99330e86cF7A42a20263bEb5daA6B12bBb638E";

export default function Details() {
    const { id } = useParams();
    const [nfts, setNfts] = useState(null); // Initialize as null
    const [owner, setOwner] = useState(null); // Initialize as null
    const address = useAddress()?.toLowerCase();
    const [scanResult, setScanResult] = useState(null);
    const [quantity, setQuantity] = useState(0);

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
                    `https://testnets-api.opensea.io/v2/chain/goerli/contract/${ERC1155ContractAddr}/nfts/${id}`
                );
                const data = response.data;

                console.log(data);
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
                    console.log("Address found with "+ owner[i].quantity);
                    return true;                    
                }
            }
        }
        console.log("No matching address found.");
        return false;
    }

    function reload() {
        location.reload();
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
                        <div>
                            <p className="text-center text-2xl font-bold mt-6 ">Enhorabuena, puede pasar  </p>
                            <button style={{ marginTop: '5%' }} className="button text-black" onClick={reload}> Test another one</button> 
                        </div>
                                 
                       </div>) 
                    : (<div>
                        <div className="close"></div>
                        <div>
                            <p className="text-center text-2xl font-bold mt-6 "> Lo sentimos, no tiene acceso  </p>
                            <button style={{ marginTop: '5%'}} className="button text-black" onClick={reload} > Test another one</button>
                        </div>
                    </div>)}
                 </div>)
                : (<div id="reader"></div>)}  
                
            </div>        
        </div>
    );
}
