import { atom } from "jotai";
import { Wallet, HDNodeWallet } from "ethers";
import { GetWalletResponse } from "@/interface/global";

export const walletAtom = atom<Wallet | HDNodeWallet | null>(null);

export const isLoggedInAtom = atom(false);

export const walletData = atom<GetWalletResponse | null>(null);

export const networkAtom = atom<string | null>("ETH");
