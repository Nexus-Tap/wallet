import { atom } from "jotai";
import { Wallet, HDNodeWallet } from "ethers";

export const walletAtom = atom<Wallet | HDNodeWallet | null>(null);

export const isLoggedInAtom = atom(false);