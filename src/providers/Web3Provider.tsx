import { ethers } from "ethers";
import Web3 from "web3";

const INFURA = `https://arbitrum-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`;
export const web3: Web3 = new Web3(new Web3.providers.HttpProvider(INFURA));

export const ethersProvider = new ethers.JsonRpcProvider(`https://arbitrum-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`);