import axios from "axios";
import { HexString } from "node_modules/ethers/lib.esm/utils/data";

const axiosBase = axios.create({
  baseURL: "http://localhost:3000",
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

export async function sendTransaction({ signedTxn }: { signedTxn: string }) {
  const res = await axiosBase.post("/send-transaction", {
    signedTxn,
  });

  return res.data;
}

export async function getGasFees(chain: string) {
  const res = await axiosBase.get(`/get-gas-price?chain=${chain}`);

  const data: {
    gasPricWei: string;
    gasPriceGwei: string;
    estimatedFeeWei: string;
  } = res.data;

  // return {
  //   gasPricWei: BigInt(data.gasPricWei),
  //   gasPriceGwei: BigInt(data.gasPriceGwei),
  //   estimatedFeeWei: BigInt(data.estimatedFeeWei),
  // };

  return data;
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

  const data: {
    gasPricWei: string;
    gasPriceGwei: string;
    estimatedFeeWei: string;
    nonce: number;
  } = res.data;

  // return {
  //   gasPricWei: BigInt(data.gasPricWei),
  //   gasPriceGwei: BigInt(data.gasPriceGwei),
  //   estimatedFeeWei: BigInt(data.estimatedFeeWei),
  //   nonce: data.nonce,
  // };

  return data;
}
