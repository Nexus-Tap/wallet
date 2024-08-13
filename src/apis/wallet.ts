import { GetWalletResponse } from "@/interface/global";

const BACKEND_URL = import.meta.env.VITE_WALLET_BACKEND;

export const getWallet = async (address: string, chain: string): Promise<GetWalletResponse | null> => {

    try {
        const resp = await fetch(`${BACKEND_URL}/get-wallet?address=${address}&chain=${chain}`, {
            method: "GET"
        });
        
        if (resp.status !== 200) {
            return null;
        }
        const jsn: GetWalletResponse = await resp.json()

        return jsn;


    } catch (err: any) {
        console.log(err);
        return null;
    }



}