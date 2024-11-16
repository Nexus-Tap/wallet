import { atom } from "jotai";
import { Wallet, HDNodeWallet } from "ethers";
import { GetWalletResponse } from "@/interface/global";
import Web3, { Web3BaseProvider } from "web3";
import { HaloWallet } from "@/lib/HaloWallet";
import { NetworkList, Networks } from "@/lib/chains";
import { RegisteredSubscription } from "node_modules/web3/lib/types/eth.exports";

export const walletAtom = atom<Wallet | HDNodeWallet | null>(null);
export const haloAtom = atom<HaloWallet | null>(null);

export const isLoggedInAtom = atom(false);

export const walletData = atom<GetWalletResponse | null>(null);

export const networkAtom = atom<string | null>("ETH");
export const currentNetworkAtom = atom("arbitrum-sepolia")

export const currentNetworkWeb3Atom = atom<Web3<RegisteredSubscription> | null>(NetworkList[2].web3);