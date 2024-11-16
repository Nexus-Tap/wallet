import {
  getGasFeesWithNonce,
  sendSignedTransaction,
  storeData,
} from "@/apis/sdk";
import { haloAtom, walletAtom } from "@/atom/global";
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
import { GasData, HaloCommand, HaloOptions, HaloResponse } from "@/interface/global";
import { TransactionRequest } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdQrScanner } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { web3 } from "@/providers/Web3Provider";

export default function SendPage() {
  const location = useLocation();
  const app = window?.Telegram?.WebApp;
  const [wallet] = useAtom(walletAtom);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const [senderAddress, setSenderAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [token, setToken] = useState("ETH");

  const [gasData, setGasData] = useState<GasData | null>(null);
  const [nonce, setNonce] = useState<number | null>(null);

  const [gasDataLoading, setGasDataLoading] = useState(false);
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [halo,] = useAtom(haloAtom);

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


  const recievePayment = async (e: any): Promise<void> => {

    e.preventDefault();
    const command: HaloCommand = {
      name: "sign",
      keyNo: 1,
      message: "010203",
      /* uncomment the line below if you get an error about setting "command.legacySignCommand = true" */
      // legacySignCommand: true,
    };

    let res: HaloResponse;

    try {
      // --- request NFC command execution ---
      const options: HaloOptions = {
        statusCallback: (cause: string) => {
          switch (cause) {
            case "init":
              toast.loading("Please tap the tag to the back of your smartphone and hold it...", {
                duration: 4000,
                icon: "⚠️",
              });
              break;
            case "retry":
              toast.error("Something went wrong, please try to tap the tag again..", {
                duration: 4000,
                icon: "⚠️",
              });
              break;
            case "scanned":
              toast.success("Tag scanned successfully, Loading wallet", {
                duration: 4000,
                icon: "⚠️",
              });
              break;
            default:
              toast.error(cause, {
                duration: 4000,
                icon: "⚠️",
              });
          }
        }
      };


      res = await execHaloCmdWeb(command, options) as HaloResponse;

      console.log(halo?.address)
      console.log(res.etherAddress)

      let receipt = await halo?.sendTransaction({
        to: "0x8d19e635E5EF038299F4a52b7CbcA63Eac3F6c25",
        value: web3.utils.toWei(amount, "ether"),
        gasLimit: 21000,
        gasPrice: web3.utils.toWei('20', 'gwei'), // Gas price
        nonce: await web3.eth.getTransactionCount(halo.address, 'latest'), // Get the nonce
      })

      // let signTx = await halo?.signTransaction(popTx!);


      // const receipt = await web3.eth.sendSignedTransaction(signedTransaction);


      console.log(receipt?.hash);

      // the command has succeeded, display the result to the user
      // setStatusText(JSON.stringify(res, null, 4));

      toast.error("Payment Recieved", {
        duration: 4000,
        icon: "⚠️",
      });



    } catch (e) {
      console.log(e)
      // the command has failed, display error to the user
      toast.error('Scanning failed, click on the button again to retry. Details: ' + (e instanceof Error ? e.message : String(e)), {
        duration: 4000,
        icon: "⚠️",
      });
    }
  };


  useEffect(() => {
    loadGasAndNonce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);


  const navigate = useNavigate();

  return (
    <>
      <div className="px-4 mt-5 flex">
        <button onClick={() => navigate("/home")}>
          <IoArrowBack size={32} className="text-white" />
        </button>
        <p className="text-white text-xl font-bold ml-[100px]">Recieve Payment</p>
      </div>
      <div className="mt-[20px] px-4">
        <form className="max-w-lg mt-2">
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
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
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

          <div className="flex-1 flex mt-[450px] items-end justify-between">
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
              onClick={recievePayment}
              className="w-[44%] h-10 flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 rounded-md text-white font-semibold"
            >
              Accept Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
