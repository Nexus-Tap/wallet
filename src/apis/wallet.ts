import { GetWalletResponse } from "@/interface/global";
import { axiosBase } from "./sdk";

export const getWallet = async (
  address: string,
  chain: string
): Promise<GetWalletResponse | null> => {
  try {
    const resp = await axiosBase.get(
      `/get-wallet?address=${address}&chain=${chain}`
    );

    if (resp.status !== 200) {
      return null;
    }

    const jsn: GetWalletResponse = resp.data;

    return jsn;
  } catch (err: any) {
    console.log(err);
    return null;
  }
};
