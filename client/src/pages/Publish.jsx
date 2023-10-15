import { useMintNFT, useContract, Web3Button } from "@thirdweb-dev/react";
import React, { useState } from 'react';
import { TextField, Button, Container } from "@mui/material"

// Your smart contract address
const contractAddress = "0x04fC8b9a53daD619761ffCBC0bfc908b3C865491";

function Test() {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: mintNft, isLoading, error } = useMintNFT(contract);

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
    console.log(formData);
  };

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

              <button>
                <Web3Button
                  contractAddress={contractAddress}
                  action={() =>
                    mintNft({
                      metadata: {
                        name: formData.name,
                        description: formData.description,
                        image: formData.image, // Accepts any URL or File type
                      },
                      supply: formData.supply,
                      to: "0xb775800d0939f219BeF0e47B4aFFD848B430D3AC", // Use useAddress hook to get the current wallet address
                    })
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
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}




export default Test;