import {
  getGasFeesWithNonce,
  sendSignedTransaction,
  storeData,
} from "@/apis/sdk";
import { walletAtom } from "@/atom/global";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GasData } from "@/interface/global";
import { TransactionRequest } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdQrScanner } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export default function SendPage() {
  const location = useLocation();
  const [wallet] = useAtom(walletAtom);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [senderAddress, setSenderAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [token, setToken] = useState("ETH");

  const [gasData, setGasData] = useState<GasData | null>(null);
  const [nonce, setNonce] = useState<number | null>(null);

  const [gasDataLoading, setGasDataLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const { qrData } = location.state || {};

  async function loadGasAndNonce() {
    if (!wallet || gasDataLoading) return;

    try {
      setGasDataLoading(true);

      const data = await getGasFeesWithNonce({
        chain: "arbitrum_sepolia",
        walletAddress: wallet.address,
      });

      setGasData({ ...data });
      setNonce(data.nonce);
    } catch (err: any) {
      console.log(err);
    } finally {
      setGasDataLoading(false);
    }
  }

  useEffect(() => {
    if (qrData !== "") {
      setSenderAddress(qrData);
    }
  }, []);

  useEffect(() => {
    if (!location.state) return;

    const locationState = {
      ...location.state,
      data: JSON.parse(location.state.data),
    } as {
      type: string;
      sessionId: string;
      data: {
        amount: number;
        toAddress: string;
        chainId: number;
      };
    };

    toast.success(JSON.stringify(locationState));

    if (locationState.data.amount) {
      setAmount(locationState.data.amount);
    }

    if (locationState.data.toAddress) {
      setSenderAddress(locationState.data.toAddress);
    }

    if (locationState.data.chainId) {
      // TODO: Change chain id in central state
    }

    if (locationState.sessionId) {
      setSessionId(locationState.sessionId);
    }
  }, [location]);

  useEffect(() => {
    loadGasAndNonce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onConfirmClick() {
    if (!wallet) {
      throw new Error("Wallet not found, please login again");
    }

    if (!amount || !senderAddress) {
      throw new Error("Please enter amount and sender address");
    }

    if (!gasData || !nonce) {
      throw new Error("Failed to get Gas data or Nonce");
    }

    try {
      setTransactionLoading(true);
      await loadGasAndNonce();

      const txReq: TransactionRequest = {
        to: senderAddress,
        from: wallet.address,
        value: amount,
        chainId: 421614,
        gasLimit: 21000,
        gasPrice: gasData.gasPricWei,
        nonce: nonce,
      };

      const signedTxn = await wallet.signTransaction(txReq);

      const res = await sendSignedTransaction({ signedTxn });

      if (!res.transactionHash) {
        throw new Error("Failed to get transaction hash");
      }

      toast.success(`Transaction sent with hash ${res.transactionHash}`);

      if (!sessionId) {
        navigate("/home");
        return;
      }

      await storeData({
        sessionId: sessionId,
        type: "SEND_TXN",
        data: res.transactionHash,
      });
    } catch (e) {
      console.log(e);
      toast.error(e?.message ?? "Failed to send transaction");
    } finally {
      setTransactionLoading(false);

      if (sessionId) {
        window.close();
      }
    }
  }

  const navigate = useNavigate();

  return (
    <>
      <div className="px-4 mt-5 flex">
        <button onClick={() => navigate("/home")}>
          <IoArrowBack size={32} className="text-white" />
        </button>
        <p className="text-white text-xl font-bold ml-[100px]">Send Payment</p>
      </div>
      <div className="mt-[20px] px-4">
        <p className="text-gray-400 text-lg">To</p>

        <form className="max-w-lg mt-2">
          <div className="flex">
            <div className="relative w-full">
              <input
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                type="text"
                className="block p-2.5 w-full z-20 text-sm  rounded-e-lg border-s-2 border bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
                placeholder="0xCadasd..."
                disabled={!!sessionId}
                required
              />
              <button
                disabled={!!sessionId}
                onClick={() => navigate("/scanner")}
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border-l-[1px] focus:ring-4 focus:outline-none"
              >
                <IoMdQrScanner size={24} />
              </button>
            </div>
          </div>

          <div className="flex w-full max-w-sm items-center space-x-2 mt-10">
            <Select
              onValueChange={setToken}
              value={token}
              disabled={!!sessionId}
            >
              <SelectTrigger className="w-[100px] bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                <SelectGroup>
                  <SelectLabel>Token</SelectLabel>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC" disabled>
                    USDC
                  </SelectItem>
                  <SelectItem value="USDT" disabled>
                    USDT
                  </SelectItem>
                  <SelectItem value="DAI" disabled>
                    DAI
                  </SelectItem>
                  <SelectItem value="WBTC" disabled>
                    WBTC
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              disabled={!!sessionId}
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              placeholder="Amount in wei"
              className="bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white"
            />
          </div>

          <div className="w-full h-[100px] p-3 mt-10 border-[1px] border-gray-500 rounded-lg flex">
            <div className="w-1/2 h-full flex flex-col justify-between">
              <p className="text-md text-white font-semibold">Estimated fee</p>
              <p className="text-xs text-gray-500">
                Market <span className="text-xs text-green-600">-60 sec</span>
              </p>
            </div>

            <div className="w-1/2">
              <p className="text-xs text-gray-300 text-right">
                <span className="font-bold">Max Fee: </span>
                {gasDataLoading ? "Loading..." : `${gasData?.gasPricWei} Wei`}
              </p>
            </div>
          </div>

          <div className="flex-1 flex mt-[150px] items-end justify-between">
            <button
              disabled={transactionLoading || gasDataLoading}
              onClick={() => navigate("/home")}
              className="w-[44%] h-10 flex justify-center items-center bg-gray-900 shadow-md py-2 px-4 rounded-md"
            >
              <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
                Reject
              </p>
            </button>
            <button
              disabled={transactionLoading || gasDataLoading}
              onClick={onConfirmClick}
              className="w-[44%] h-10 flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 rounded-md text-white font-semibold"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
