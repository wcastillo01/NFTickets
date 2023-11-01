import React from 'react'
import { useOwnedNFTs, useContract, useAddress } from "@thirdweb-dev/react";


const contractAddress = "0x0D3E82CC75045dD5AA114a1B0A53e01a99f4A68C";
export default function Test() {
  const address = "0xffe227D2451316f929c49444Fe3B7117639aa3A0";
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);

  console.log({ data });
  return (
    <div>Test</div>
  )
}
