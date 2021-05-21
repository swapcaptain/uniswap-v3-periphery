// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const factoryAddress = '0xa5cB206982DeB96C5111f61c2eA37d95d2248f1a';
const wethAddress = '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa';

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile 
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  console.log("Account balance:", (await deployer.getBalance()).toString());
  // Libraries
  const NFTDescriptor = await hre.ethers.getContractFactory("NFTDescriptor");
  const nftDescriptor = await NFTDescriptor.deploy();
  await nftDescriptor.deployed();
  console.log("NFTDescriptor deployed to:", nftDescriptor.address);

  // We get the contract to deploy
  const Quoter = await hre.ethers.getContractFactory("Quoter");
  const quoter = await Quoter.deploy(factoryAddress, wethAddress);
  await quoter.deployed();
  console.log("Quoter deployed to:", quoter.address);
  //
  const TickLens = await hre.ethers.getContractFactory("TickLens");
  const tickLens = await TickLens.deploy();
  await tickLens.deployed();
  console.log("TickLens deployed to:", tickLens.address);
  //
  const NFTPositionDescriptor = await hre.ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
    libraries: {
      NFTDescriptor: nftDescriptor.address,
    }
  });
  const nftPositionDescriptor = await NFTPositionDescriptor.deploy(wethAddress);
  await nftPositionDescriptor.deployed();
  console.log("nonfungibleTokenPositionDescriptor deployed to:", nftPositionDescriptor.address);
  //
  const NonfungiblePositionManager = await hre.ethers.getContractFactory("NonfungiblePositionManager");
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(factoryAddress, wethAddress, nftPositionDescriptor.address);
  await nonfungiblePositionManager.deployed();
  console.log("NonfungiblePositionManager deployed to:", nonfungiblePositionManager.address);
  //
  const SwapRouter = await hre.ethers.getContractFactory("SwapRouter");
  const swapRouter = await SwapRouter.deploy(factoryAddress, wethAddress);
  await swapRouter.deployed();
  console.log("SwapRouter deployed to:", swapRouter.address);
  //
  const V3Migrator = await hre.ethers.getContractFactory("V3Migrator");
  const v3Migrator = await V3Migrator.deploy(factoryAddress, wethAddress, nonfungiblePositionManager.address);
  await v3Migrator.deployed();
  console.log("V3Migrator deployed to:", v3Migrator.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
