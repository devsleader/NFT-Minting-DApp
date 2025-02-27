# 🎨 NFT Minting DApp

An **NFT Minting DApp** built with **Next.js, Tailwind CSS, Hardhat, and Ethers.js** that allows users to **mint NFTs** on a local Ethereum blockchain. Users can upload an image, specify a recipient Ethereum address, and mint an NFT using a smart contract.

---

## ✨ Features

- Upload or Drag & Drop an image to mint as an NFT.
- Specify the recipient Ethereum address for the NFT.
- Connects to a **local Hardhat blockchain** for smart contract interaction.
- Uses **Ethers.js** to handle blockchain transactions.
- **Fully responsive UI** styled with Tailwind CSS.

---

## 🛠️ Technologies Used

- **Next.js** - React framework for frontend development.
- **Tailwind CSS** - Styling framework for UI design.
- **Hardhat** - Ethereum development environment for smart contracts.
- **Ethers.js** - Library for interacting with Ethereum blockchain.
- **Solidity** - Programming language for writing smart contracts.

---

## 🚀 Getting Started

Follow the instructions below to clone, install dependencies, and run the DApp.

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/devsleader/NFT-Minting-DApp.git
cd nft-minting-app
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

## **⚙️ Running the Project** 

### **Start a Local Blockchain**

Use Hardhat to start a local Ethereum blockchain. This will create 20 test accounts.

```sh
npx hardhat node
```

## **Deploy the Smart Contract**

Open a new terminal and deploy the contract to the local Hardhat network:

```sh
npx hardhat run scripts/deploy.ts --network localhost
```

## **Start the Frontend**

Run the Next.js development server:

```sh
npm run dev
```