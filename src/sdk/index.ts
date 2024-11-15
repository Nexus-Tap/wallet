import { storeData } from "@/apis/sdk";
import { HDNodeWallet, Wallet } from "ethers";

export async function signMessage(
  wallet: Wallet | HDNodeWallet,
  message: string,
  sessionId: string
): Promise<string> {
  const signedMessage = await wallet.signMessage(message);

  await storeData({
    sessionId: sessionId,
    type: "SIGN_MSG",
    data: signedMessage,
  });

  return signedMessage;
}

export async function getWalletAddress(
  wallet: Wallet | HDNodeWallet,
  sessionId: string
): Promise<string> {
  const walletAddress = wallet.address;

  await storeData({
    sessionId: sessionId,
    type: "CONNECT",
    data: walletAddress,
  });

  return walletAddress;
}

export async function sendEth(
  wallet: Wallet | HDNodeWallet,
  sessionId: string,
  data: {
    to: string;
    amount: number;
  }
): Promise<string> {
  const txRes = await wallet.sendTransaction({
    to: data.to,
    value: data.amount,
    from: wallet.address,
  });

  await storeData({
    sessionId: sessionId,
    type: "SEND_ETH",
    data: txRes.hash,
  });

  return txRes.hash;
}
