# The project is fork form uniswap-v3-periphery to run on polygon network
## Address:
Mumbai

Deploying contracts with the account: 0x554BbacBA61D5a2526dF1e9064b7e45ba13767E5
Account balance: 636385153000000000
NFTDescriptor deployed to: 0x267b16B8B85D776df2DA983e1c80A3238f49b4f5
Quoter deployed to: 0x29e425ECe548a15543F9FA2798DA8C37a2529b12
TickLens deployed to: 0x41767deb5609846506b5AC7FBC214954bbacc021
nonfungibleTokenPositionDescriptor deployed to: 0xf8ff7e2Ef3ec6ec6a7d79824F66E6C99b747EA85
NonfungiblePositionManager deployed to: 0x53C2b158c6ceA6E72f5690f47733AB43D14f829F
SwapRouter deployed to: 0xa2e84b47A98227cb2dAad0123DFe1fDf41494fE3
V3Migrator deployed to: 0x7779381e290d6a912ee46Edc372B063F785Fe7CF

# Uniswap V3 Periphery

[![Tests](https://github.com/Uniswap/uniswap-v3-periphery/workflows/Tests/badge.svg)](https://github.com/Uniswap/uniswap-v3-periphery/actions?query=workflow%3ATests)
[![Lint](https://github.com/Uniswap/uniswap-v3-periphery/workflows/Lint/badge.svg)](https://github.com/Uniswap/uniswap-v3-periphery/actions?query=workflow%3ALint)

This repository contains the periphery smart contracts for the Uniswap V3 Protocol.
For the lower level core contracts, see the [uniswap-v3-core](https://github.com/Uniswap/uniswap-v3-core)
repository.

## Bug bounty

This repository is subject to the Uniswap V3 bug bounty program,
per the terms defined [here](./bug-bounty.md).

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@uniswap/v3-periphery`
and import bytecode imported from artifacts located at
`@uniswap/v3-periphery/artifacts/contracts/*/*.json`.
For example:

```typescript
import {
  abi as SWAP_ROUTER_ABI,
  bytecode as SWAP_ROUTER_BYTECODE,
} from '@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Uniswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Uniswap v3 periphery interfaces are available for import into solidity smart contracts
via the npm artifact `@uniswap/v3-periphery`, e.g.:

```solidity
import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract MyContract {
  ISwapRouter router;

  function doSomethingWithSwapRouter() {
    // router.exactInput(...);
  }
}

```
