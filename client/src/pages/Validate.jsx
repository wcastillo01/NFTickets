import React, { useEffect, useState, useRef } from "react";
import { useOwnedNFTs, useContract, useAddress } from "@thirdweb-dev/react";
import QRCode from "qrcode";

export default function Validate() {
  const address = "0xffe227D2451316f929c49444Fe3B7117639aa3A0";
  const ERC1155ContractAddr = "0xb612375913D4bA5d72aa21Cf6567B8BA8724F8Cb";
  const { contract } = useContract(ERC1155ContractAddr);
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const [isValidated, setisValidated] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const qrCodeCanvasRef = useRef(null);

  const NameToSearch = "Matematica";

  useEffect(() => {
    console.log(data);
    if (data !== undefined) {
      data.find((element) => {
        if (element.metadata.name === NameToSearch) {
          console.log("validado");
          setisValidated(true);
        }
      });
    }
  }, [data]);

  return (
    <div>
      {address}
      {isValidated ? (
        <div>
          Validado
          {/* Render your QR Code here */}
          <canvas ref={qrCodeCanvasRef}></canvas>
        </div>
      ) : (
        <div>No validado</div>
      )}
    </div>
  );
}
