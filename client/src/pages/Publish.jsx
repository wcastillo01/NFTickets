import { useMintNFT, useContract, Web3Button, useAddress } from "@thirdweb-dev/react";
import React, { useState } from 'react';
import { TextField, Button, Container } from "@mui/material"
import { useCreateDirectListing } from "@thirdweb-dev/react";
import {ethers} from "ethers";

// Your smart contract address
const ERC1155ContractAddr = "0x0D3E82CC75045dD5AA114a1B0A53e01a99f4A68C";
const MarketplaceAddr = "0xe8ab090820BAf2B9E1518032D69B0a765bbc7474";
const PublisherWallet = "0xb775800d0939f219BeF0e47B4aFFD848B430D3AC";

function Test() {
  const address = useAddress();
  const { contract } = useContract(ERC1155ContractAddr);
  const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);

  const { contract:marketplace } = useContract(MarketplaceAddr, "marketplace-v3");
  const {
    mutateAsync: createDirectListing,
  } = useCreateDirectListing(marketplace);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    supply: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data, e.g., send it to an API
    // console.log(formData);
  };

  if (address !== PublisherWallet) return (
    <div>
      <h1
        style={{
          fontSize: '2.5rem', // You can adjust the font size as needed
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
          width: '40%',
          margin: '0 auto', // Add this line to center horizontally
        }}
      >
        Lo sentimos, aun no tienes acceso para publicar eventos. Registrate aqui:
      </h1>

      <div className="min-h-screen flex justify-center items-center">
        <div
          className="bg-white w-full max-w-xl p-4 rounded-lg border"
          style={{ marginTop: "-450px" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Registrate</h2>
            <div className="text-right">
              <h3 className="text-xl font-bold text-black">Contacto</h3>
              <p className="text-sm text-gray-500">creators@nftickets.com</p>
            </div>
          </div>
          <form>
            <input
              type="email"
              className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm mt-2"
              placeholder="Tu correo electrónico"
              value=""
              required
            />
            <textarea
              className="w-full h-32 bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm mt-2"
              placeholder="Describenos tu propuesta..."
              value=""
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  )

return (
    <div>
      <div>
        <div className="min-h-screen flex justify-center items-center">
          <div
            className="bg-white w-full max-w-md bg-blue-glassmorphism p-6 rounded-lg border shadow-lg"
            style={{ marginTop: "-150px" }}
          >
            <h2 className="text-2xl font-bold mb-8">Crear evento</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Nombre"
                  required
                />
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Descripcion"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Imagen (link)"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="number"
                  name="supply"
                  value={formData.supply}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Cantidad"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="checkbox"
                  name="agreedTerms"
                  checked={formData.agreedTerms}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <label className="text-sm">Acepto los términos y condiciones</label>
              </div>

                <Web3Button
                  contractAddress={ERC1155ContractAddr}
                  action={() => {
 
                    mintNft({
                      metadata: {
                        name: formData.name,
                        description: formData.description,
                        image: formData.image, // Accepts any URL or File type
                      },
                      supply: formData.supply,
                      to: "0xb775800d0939f219BeF0e47B4aFFD848B430D3AC", // Use useAddress hook to get the current wallet address
                    }).then(result => {
                     return createDirectListing({
                      assetContractAddress: ERC1155ContractAddr,
                      tokenId: ethers.BigNumber.from(result.id._hex).toString(),
                      pricePerToken: "0.00000000000000001",
                      quantity: formData.supply,
                      
                     })
                    }).catch(console.error)
                  }
                }
                  disabled={
                    !formData.name ||
                    !formData.description ||
                    !formData.image ||
                    !formData.supply ||
                    !formData.agreedTerms
                  }
                >
                  Crear NFT
                </Web3Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}




export default Test;