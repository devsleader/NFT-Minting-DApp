import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");

  const myNFT = await MyNFT.deploy(deployer.address);

  await myNFT.waitForDeployment();
  console.log("Contract deployed to:", await myNFT.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
