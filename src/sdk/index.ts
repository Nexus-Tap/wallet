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
