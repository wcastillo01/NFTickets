import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddress,
  useBuyDirectListing,
  useContract,
  Web3Button,
} from "@thirdweb-dev/react";
import "./Details.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ERC1155ContractAddr = "0xcdc33713EC1Cc323e4CC2B23Ae2f90ecabB511Df";
const MarketplaceAddr = "0xbF99330e86cF7A42a20263bEb5daA6B12bBb638E";
const PublisherWallet = "0xb775800d0939f219BeF0e47B4aFFD848B430D3AC";

export default function Details() {
  const { id } = useParams();
  const [nfts, setNfts] = useState();
  const [loading, setLoading] = useState(true);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const { contract } = useContract(MarketplaceAddr, "marketplace-v3");
  const { mutateAsync: buyDirectListing } = useBuyDirectListing(contract);
  const increaseQuantity = () => {
    setTicketQuantity((prevQuantity) => prevQuantity + 1);
  };

  const connectedUser = useAddress();
  const navigate = useNavigate();

  const decreaseQuantity = () => {
    if (ticketQuantity > 1) {
      // No permitimos que la cantidad sea menor a 1
      setTicketQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

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
          `https://testnets-api.opensea.io/v2/chain/goerli/contract/${ERC1155ContractAddr}/nfts/${id}`,
          options
        );
        const data = await response.json();
        const metadata_link = data.nft.metadata_url.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );

        const metadata = await axios.get(metadata_link);
        const image_url = metadata.data.image;
        setNfts({
          ...data.nft,
          image_url,
          date: metadata.data.eventDate,
          location: metadata.data.location,
          price: metadata.data.price,
          cantidad: metadata.data.supply,
        });
        // console.log(metadata.data.eventDate);
        // console.log(metadata.data.location);
        setLoading(false);
        // console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  function sendEmail() {
    axios.post("http://localhost:777/send-email", {
      email: "wcastillopujols1@gmail.com", // HARDCODED
      ticketTitle: nfts.name,
      ticketQuantity: ticketQuantity.toString(),
      eventTime: nfts.date,
      eventLocation: nfts.location,
    })
  }

  function redirect() {
    // Wait 1200 ms before redirecting
    setTimeout(function () {
      navigate("/owned");
    }, 3000);
  }

  function isAdmin(){
    if (connectedUser === PublisherWallet) {
      return true;
    }
    return false;
  }

  if (loading == true) {
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
    <div className="Tab white-glassmorphism">
      <h1 className="Name"> {nfts?.name}</h1>
      <div className="LeftTab">
        <img className="Image" src={nfts?.image_url} />
      </div>

      <div className="side-tab">
        <div className="event-description-container">
          <p className="font-bold"> Descripción:</p>
          <p className="Description">
            {nfts?.description}
          </p>
        </div>
        <h1>
          <b>&#128337;:</b> {nfts?.date}
        </h1>
        <h1>
          <b>&#128205;:</b> {nfts?.location}
        </h1>
        <h1>
          <b>&#128178;:</b> {nfts?.price}
        </h1>

        <div className="quantity-container">
          <h1>Cantidad:</h1>
          <div className="button-container">
            <button onClick={decreaseQuantity}>-</button>
            <span>{ticketQuantity}</span>
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <br />
        <div style={{ textAlign: "Justify" }}>
          <Web3Button
            contractAddress={MarketplaceAddr}
            action={() => {
            const buyPromise =  buyDirectListing({
                listingId: nfts.identifier,
                quantity: ticketQuantity.toString(),
                buyer: connectedUser,
              }).then((res) => {
                sendEmail();
              });
              toast.promise(
                buyPromise,
                {
                  pending: 'Procesando...',
                  success: 'Compra exitosa!',
                  error: 'Error al comprar'
                },
                {
                  style: {
                    position: "bottom-right",
                    minWidth: '250px',
                  }
                }
              ).then(() => {
                redirect();
              });
            }
          }
          >
            Comprar ahora
          </Web3Button>
          {isAdmin()
          ? (<Link to={`/validate/${nfts.identifier}`}>
              <button className="validate button">Validar</button>
            </Link>)
          : (<div></div>)}	
         
          
        </div>
      </div>
    </div>
  );
}
