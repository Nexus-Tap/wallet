import {
  getGasFeesWithNonce,
  sendSignedTransaction,
  storeData,
} from "@/apis/sdk";
import { currentNetworkAtom, currentNetworkWeb3Atom, haloAtom, walletAtom } from "@/atom/global";
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
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { bridgeUSDC } from "@/lib/transfer";
import { NetworkList, Networks } from "@/lib/chains";

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

  const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);
  const [currentNetworkWeb3, setCurrentNetworkWeb3] = useAtom(currentNetworkWeb3Atom);


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

    try {

      if (token === "USDC") {
        await bridgeUSDC(
          halo!,
          "arbitrum-sepolia",
          "optimism-sepolia",
          "0x375C11FD30FdC95e10aAD66bdcE590E1bccc6aFA",
          0.1
        );
      } else {

        let receipt = await halo?.sendTransaction({
          to: halo.address,
          value: currentNetworkWeb3?.utils.toWei(amount, "ether"),
          gasLimit: 21000,
          gasPrice: currentNetworkWeb3?.utils.toWei('20', 'gwei'), // Gas price
        })

        toast.success("Payment Recieved", {
          duration: 4000,
          icon: "⚠️",
        });

        console.log(receipt?.hash);
      }

    } catch (e) {
      console.log(e)
      // the command has failed, display error to the user
      toast.error('Error' + (e instanceof Error ? e.message : String(e)), {
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
        <p className="text-white text-xl font-bold ml-[100px]">Receive Payment</p>
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
                  <SelectItem value="USDC">
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

          {
            token === "USDC" &&
            (
              <div>
                <div className="w-full mt-4">
                  <p className="w-full text-white font-bold">User Network</p>
                  <Select
                    onValueChange={(network) => {
                      setCurrentNetwork(network);
                      setCurrentNetworkWeb3(Networks[network].web3);
                    }}
                    value={currentNetwork}
                  >
                    <SelectTrigger className="w-full h-5 p-5 bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                      <SelectGroup>
                        {NetworkList.map((network) => (
                          <SelectItem value={network.network.slug}>{network.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full mt-4">
                  <p className="w-full text-white font-bold">Merchant Network</p>
                  <Select
                    onValueChange={(network) => {
                      setCurrentNetwork(network);
                      setCurrentNetworkWeb3(Networks[network].web3);
                    }}
                    value={currentNetwork}
                  >
                    <SelectTrigger className="w-full h-5 p-5 bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                      <SelectGroup>
                        {NetworkList.map((network) => (
                          <SelectItem value={network.network.slug}>{network.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )
          }



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

          <div className="absolute bottom-0 w-[90%] flex justify-between pb-10">
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
