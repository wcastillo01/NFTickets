import {
  useMintNFT,
  useContract,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useCreateDirectListing } from "@thirdweb-dev/react";
import { ethers } from "ethers";

// Your smart contract address
const ERC1155ContractAddr = "0xb612375913D4bA5d72aa21Cf6567B8BA8724F8Cb";
const MarketplaceAddr = "0x3F4B384A7a8dE244434f3d82475304Dd1cEc4681";
const PublisherWallet = "0xffe227D2451316f929c49444Fe3B7117639aa3A0";

function Test() {
  const address = useAddress();
  const { contract } = useContract(ERC1155ContractAddr);
  const { mutateAsync: mintNft, isLoading } = useMintNFT(contract);
  const { contract: marketplace } = useContract(
    MarketplaceAddr,
    "marketplace-v3"
  );
  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    supply: "",
    eventDate: "",
    genre: "",
    price: "",
    image: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({ ...prevData, image: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (address !== PublisherWallet)
    return (
      <div className=" flex flex-col justify-center items-center text-white bg-opacity-20 backdrop-blur-md">
        <h1 className="text-4xl font-bold mb-16 mt-8 text-center w-4/5 lg:w-3/5">
          Lo sentimos, aun no tienes acceso para publicar eventos. Suscríbete
          aquí:
        </h1>

        <div className="w-full flex justify-center">
          {/* Contenedor de los planes */}
          <div className="flex justify-around w-4/5 max-w-6xl">
            {/* Plan A */}
            <div className="bg-white/20 p-8 py-20 rounded-lg border border-blue-200 shadow-lg w-1/3 mx-4 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h2 className="text-4xl font-bold text-center mb-12">
                  Plan Básico
                </h2>
                <ul className="text-lg mb-8">
                  <li>✓ 2 eventos al año</li>
                  <li>✓ Soporte básico por correo electrónico</li>
                  <li>✓ Flujo de acceso al evento</li>
                </ul>
              </div>
              <button
                type="button"
                className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 w-full mt-8"
              >
                Suscribirse
              </button>
            </div>

            {/* Plan B */}
            <div className="bg-white/20 p-8 py-20 rounded-lg border border-blue-200 shadow-lg w-1/3 mx-4 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h2 className="text-4xl font-bold text-center mb-12">
                  Plan Estándar
                </h2>
                <ul className="text-lg mb-8">
                  <li>✓ 6 eventos al año</li>
                  <li>✓ Soporte prioritario</li>
                  <li>✓ Promoción básica de eventos</li>
                  <li>✓ Flujo de acceso al evento</li>
                </ul>
              </div>
              <button
                type="button"
                className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 w-full mt-8"
              >
                Suscribirse
              </button>
            </div>

            {/* Plan C */}
            <div className="bg-white/20 p-8 py-20 rounded-lg border border-blue-200 shadow-lg w-1/3 mx-4 flex flex-col justify-between backdrop-blur-md">
              <div>
                <h2 className="text-4xl font-bold text-center mb-12">
                  Plan Premium
                </h2>
                <ul className="text-lg mb-8">
                  <li>✓ Eventos ilimitados</li>
                  <li>✓ Soporte premium 24/7</li>
                  <li>✓ Promoción destacada de eventos</li>
                  <li>✓ Flujo de acceso al evento</li>
                </ul>
              </div>
              <button
                type="button"
                className="bg-blue-600 text-white px-10 py-4 rounded-lg hover:bg-blue-700 w-full mt-8"
              >
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <div>
        <div className="min-h-screen mt-8 flex justify-center items-center">
          <div
            className="w-full max-w-md white-glassmorphism p-6 rounded-lg border shadow-lg"
            style={{ marginTop: "-150px" }}
          >
            <h2 className="text-3xl font-bold mb-2 text-white">Crear evento</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label className="text-white">Nombre:</label>
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

              <div className="mb-1">
                <label className="text-white">Género del evento:</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  required
                >
                  <option value="Musica">Música</option>
                  <option value="Cine">Cine</option>
                  <option value="Comedia">Comedia</option>
                  <option value="Deportes">Deportes</option>
                </select>
              </div>

              <div className="mb-1">
                <label className="text-white">Fecha del evento:</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Fecha del evento"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="mb-1">
                <label className="text-white">Ubicación del evento:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Ubicación del evento"
                  required
                />
              </div>

              <div className="mb-1">
                <label className="text-white">Descripción:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Descripción (Máximo 200 caracteres)"
                  maxLength="200"
                  cols="30"
                  required
                />
              </div>

              <div className="mb-1">
                <label className="text-white">Precio:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg"
                  placeholder="Precio"
                  required
                />
              </div>

              <div className="mb-1">
                <label className="text-white">Cantidad:</label>
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

              <div className="mb-1 flex items-center text-white">
                <label className="text-white">Imagen promocional:</label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  className="w-full p-2 rounded-lg"
                  required
                />
              </div>

              <div className="mb-1">
                <input
                  type="checkbox"
                  name="agreedTerms"
                  checked={formData.agreedTerms}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                <label className="text-sm text-white">
                  Acepto los términos y condiciones
                </label>
              </div>

              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Web3Button
                  contractAddress={ERC1155ContractAddr}
                  action={() =>
                    mintNft({
                      metadata: {
                        name: formData.name,
                        description: formData.description,
                        image: formData.image,
                        eventDate: formData.eventDate,
                        genre: formData.genre,
                        price: formData.price,
                        location: formData.location,
                      },
                      supply: formData.supply,
                      to: "0xffe227D2451316f929c49444Fe3B7117639aa3A0",
                    })
                      .then((result) => {
                        return createDirectListing({
                          assetContractAddress: ERC1155ContractAddr,
                          tokenId: ethers.BigNumber.from(
                            result.id._hex
                          ).toString(),
                          pricePerToken: formData.price,
                          quantity: formData.supply,
                        });
                      })
                      .catch(console.error)
                  }
                >
                  Crear NFT
                </Web3Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
