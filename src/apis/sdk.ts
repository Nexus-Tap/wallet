import { GasData, GasDataWithNonce } from "@/interface/global";
import axios from "axios";
import { HexString } from "node_modules/ethers/lib.esm/utils/data";

export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_WALLET_BACKEND,
});

export async function storeData({
  sessionId,
  data,
  type,
}: {
  sessionId: string;
  data: string;
  type: string;
}) {
  const res = await axiosBase.post("/sdk/store-data", {
    sessionId,
    data,
    type,
  });

  return res.data;
}

export async function getReqData({ sessionId }: { sessionId: string }) {
  const res = await axiosBase.get(`/sdk/get-req?sessionId=${sessionId}`);

  return res.data as {
    sessionId: string;
    data: string;
    type: string;
  };
}

export async function sendSignedTransaction({
  signedTxn,
}: {
  signedTxn: string;
}) {
  const res = await axiosBase.post("/send-transaction", {
    signedTxn,
  });

  return res.data as {
    transactionHash: string;
  };
}

export async function getGasFees(chain: string) {
  const res = await axiosBase.get(`/get-gas-price?chain=${chain}`);

  const data: GasData = res.data;
  return data;

  // return {
  //   gasPricWei: BigInt(data.gasPricWei),
  //   gasPriceGwei: BigInt(data.gasPriceGwei),
  //   estimatedFeeWei: BigInt(data.estimatedFeeWei),
  // };
}

export async function getGasFeesWithNonce({
  chain,
  walletAddress,
}: {
  chain: string;
  walletAddress: HexString;
}) {
  const res = await axiosBase.get(
    `/get-gas-price?chain=${chain}&walletAddress=${walletAddress}`
  );

  const data: GasDataWithNonce = res.data;
  return data;

  // return {
  //   gasPricWei: BigInt(data.gasPricWei),
  //   gasPriceGwei: BigInt(data.gasPriceGwei),
  //   estimatedFeeWei: BigInt(data.estimatedFeeWei),
  //   nonce: data.nonce,
  // };
}
