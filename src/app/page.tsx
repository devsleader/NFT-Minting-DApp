"use client";

import { useState, useEffect, DragEvent } from "react";
import { JsonRpcProvider, Contract } from "ethers";
import MyNFTABI from "../../artifacts/contracts/MyNFT.sol/MyNFT.json";

export default function Home() {
  const [contractAddress] = useState("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
  const [provider, setProvider] = useState<JsonRpcProvider | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [mintStatus, setMintStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    const _provider = new JsonRpcProvider("http://127.0.0.1:8545");
    setProvider(_provider);
    const contractInstance = new Contract(contractAddress, MyNFTABI.abi, _provider);
    setContract(contractInstance);
  }, [contractAddress]);

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleMintNFT = async () => {
    if (!contract || !provider) {
      setMintStatus("Contract not loaded.");
      return;
    }
    if (recipientAddress.trim() === "") {
      setMintStatus("Please enter a valid recipient address.");
      return;
    }
    if (!selectedFile) {
      setMintStatus("Please select an image file.");
      return;
    }

    try {
      setLoading(true);
      setMintStatus("Minting NFT...");
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      const tx = await contractWithSigner.mintNFT(recipientAddress);
      await tx.wait();
      setMintStatus("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      setMintStatus("Error minting NFT.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">
          Mint Your NFT
        </h1>
        
        <div className="mb-6">
          <p className="text-center text-sm text-gray-500 mb-1">Contract Address</p>
          <p className="text-center text-gray-700 font-mono break-all">
            {contractAddress}
          </p>
        </div>

        <div 
          className="relative mb-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleFileDrop}
        >
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4 cursor-pointer
                       hover:border-blue-400 hover:bg-blue-50 transition-colors"
          >
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="mx-auto h-48 object-contain mb-2 rounded-md"
              />
            ) : (
              <p className="text-gray-400 text-center mb-2">
                Drag & Drop an image here
              </p>
            )}
            <label 
              htmlFor="file-input" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors cursor-pointer"
            >
              {previewUrl ? "Change Image" : "Choose File"}
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1" htmlFor="recipient">
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            placeholder="e.g., 0x..."
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          onClick={handleMintNFT}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors text-sm
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Minting..." : "Mint NFT"}
        </button>

        {mintStatus && (
          <div
            className={`mt-4 text-center text-sm px-3 py-2 rounded-md ${
              mintStatus.includes("successfully")
                ? "bg-green-100 text-green-700"
                : mintStatus.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {mintStatus}
          </div>
        )}
      </div>
    </div>
  );
}
