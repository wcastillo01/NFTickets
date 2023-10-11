import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Details.css";

export default function Details() {

  const {id} = useParams();
  const [nfts, setNfts] = useState();
  const [loading, setLoading] = useState(true);


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
                    `https://testnets-api.opensea.io/v2/chain/goerli/contract/0x04fC8b9a53daD619761ffCBC0bfc908b3C865491/nfts/${id}`,
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

    if(loading == true){
        return(
        <div>loading</div>
        )   
     } 

  return (
    <div class="Tab">
    <h1 class="Name"> {nfts?.name}</h1> 
    <h1 class="Creator"> <b>Creador:</b> {nfts?.creator}</h1>
    <span class="Quantity"> <b>Cantidad: </b> {nfts?.owners[0].quantity}</span>
    <p class="Description"> {nfts?.description}</p>
    <img class="Image" src={nfts?.image_url}/>
    </div>
  )
}
