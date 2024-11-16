import { atom } from "jotai";
import { Wallet, HDNodeWallet } from "ethers";
import { GetWalletResponse } from "@/interface/global";
import Web3, { Web3BaseProvider } from "web3";
import { HaloWallet } from "@/lib/HaloWallet";

export const walletAtom = atom<Wallet | HDNodeWallet | null>(null);
export const haloAtom = atom<HaloWallet | null>(null);

export const isLoggedInAtom = atom(false);

export const walletData = atom<GetWalletResponse | null>(null);

export const networkAtom = atom<string | null>("ETH");
