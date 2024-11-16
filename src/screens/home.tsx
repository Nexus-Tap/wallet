import { IoIosArrowDown } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { currentNetworkAtom, currentNetworkWeb3Atom, haloAtom, walletAtom, walletData } from "@/atom/global";
import { useEffect, useRef, useState } from "react";
import { getWallet } from "@/apis/wallet";

import { FaCoins } from "react-icons/fa6";
import { RiQrScan2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NetworkList, Networks } from "@/lib/chains";
import { ABI } from "@/lib/usdc";
import Web3 from "web3";

export default function HomeScreen() {
  const app = window?.Telegram?.WebApp;

  const navigate = useNavigate();
  const location = useLocation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Add this at the top


  const [balance, setBalance] = useState("");
  const [usdcBalance, setUsdcBalance] = useState("");


  const [wallet] = useAtom(walletAtom);
  const [halo] = useAtom(haloAtom);

  const [myWalletData, setMyWalletData] = useAtom(walletData);

  const [seeTokens, setSeeTokens] = useState(true);
  const [processedAlready, setProcessedAlready] = useState(false);

  const [currentNetwork, setCurrentNetwork] = useAtom(currentNetworkAtom);
  const [currentNetworkWeb3, setCurrentNetworkWeb3] = useAtom(currentNetworkWeb3Atom);


const loadData = async () => {
    try {
        console.log(halo?.address!);
        let balanceInWei = await currentNetworkWeb3?.eth.getBalance(halo?.address!)!;
        const balanceInEther = currentNetworkWeb3?.utils.fromWei(balanceInWei, 'ether')!;

        const usdcContract = new (currentNetworkWeb3 as Web3).eth.Contract(ABI, Networks[currentNetwork].usdcContract);
        const balance: string = await usdcContract.methods.balanceOf(halo?.address).call();

        setBalance(balanceInEther)
        setUsdcBalance((BigInt(balance) /  BigInt(1000000)).toString())
        console.log(balanceInEther)
        console.log(BigInt(balance))
        console.log(currentNetwork)
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

useEffect(() => {
    // Clear existing interval if any
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }

    // Only set up new interval if we have necessary dependencies
    if (currentNetworkWeb3 && halo?.address && currentNetwork) {
        loadData(); // Initial load
        intervalRef.current = setInterval(loadData, 5000);
    }

    // Cleanup
    return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
}, [currentNetwork]); // Only depe

  return (
    <>
      <div className="w-screen h-16 bg-gray-950 shadow-xl flex items-center justify-between px-5 pt-6">
        <div className="w-[80%] flex">
          <div className="rounded-full w-10 h-10 overflow-hidden">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqeBwpk5JRR2Yz27Nr9jmdsC0o-Ewh3m1TBQ&s"
              alt=""
            />
          </div>

          <div className="w-1/2 flex flex-col justify-center ml-3">
            <p className="text-white font-bold flex items-center">
              {halo?.address.slice(0, 5)}...
              {halo?.address.slice(
                halo.address.length - 4,
                halo.address.length
              )}{" "}
            </p>
            <p className="text-white text-[9px] flex">
              <Select
                onValueChange={(network) => {
                  setCurrentNetwork(network);
                  setCurrentNetworkWeb3(Networks[network].web3);
                }}
                value={currentNetwork}
              >
                <SelectTrigger className="w-full h-5 p-2 bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
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
            </p>
          </div>
        </div>

        <RiQrScan2Line
          style={{ stroke: "url(#blue-gradient)" }}
          className="text-white"
          size={25}
          onClick={() => {
            navigate("/scanner");
          }}
        />
      </div>

      <div className="w-screen flex flex-col items-center mt-10">
        <p className="text-3xl text-white font-bold">
          {balance} ETH
        </p>
        <p className="text-white text-sm">
          ${myWalletData?.price.toFixed(2)}
          {myWalletData?.percent_change! < 0 ? (
            <span className="text-red-600">
              {" "}
              {myWalletData?.percent_change.toFixed(2)}%
            </span>
          ) : (
            <span className="text-green-600">
              +{myWalletData?.percent_change.toFixed(2)}%
            </span>
          )}
        </p>
      </div>

      <div className="w-screen mt-10 px-14 flex justify-between">
        <div
          className="w-17 h-17 flex flex-col justify-center items-center"
          onClick={() => {
            navigate("/send");
          }}
        >
          <div className="w-12 h-12 flex justify-center items-center bg-gray-900 rounded-full overflow-hidden">
            <BsSend className="text-gray-200" size={24} />
          </div>
          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
            Send
          </p>
        </div>

        <div
          className="w-17 h-17 flex flex-col justify-center items-center"
          onClick={() => navigate("/receive")}
        >
          <div className="w-12 h-12 flex justify-center items-center bg-gray-900 rounded-full overflow-hidden">
            <CiWallet className="text-gray-200" size={24} />
          </div>
          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
            Receive
          </p>
        </div>

        <div className="w-17 h-17 flex flex-col justify-center items-center">
          <div className="w-12 h-12 flex justify-center items-center bg-gray-900 rounded-full overflow-hidden">
            <FaEthereum className="text-gray-200" size={24} />
          </div>
          <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
            Buy Eth
          </p>
        </div>
      </div>

      <div className="my-8">
        <div className="flex flex-row gap-9 text-white justify-center">
          {[
            { label: "Tokens", active: seeTokens },
            { label: "NFT", active: !seeTokens },
          ].map((item, index) => (
            <h3
              key={index}
              onClick={() => {
                setSeeTokens(!seeTokens);
              }}
              className={cn(
                "text-white font-semibold py-2.5",
                !item.active && "text-cyan-200",
                item.active && "border-b-2 border-white"
              )}
            >
              {item.label}
            </h3>
          ))}
        </div>

        <div className="bg-gray-700 w-full h-[1px] border-none"></div>
      </div>

      {seeTokens ? (
        <div className="h-[200px] flex flex-col gap-6 px-4 overflow-y-scroll">
          <div className="flex flex-row items-center gap-2.5">
            <div className="w-10 h-10 flex justify-center items-center bg-gray-800 rounded-full">
              <FaCoins className="text-gray-200" size={24} />
            </div>

            <div className="flex flex-1 flex-col">
              <p className="text-white font-semibold">USDC</p>

              <p className="text-sm flex flex-row gap-2">
                <span className="text-gray-400">
                  $1
                </span>

                <span
                  className={cn(
                    0.1 < 0
                      ? "text-red-600"
                      : "text-green-300"
                  )}
                >
                  {0.1 > 0 ? "+" : ""}
                  {0.1.toFixed(2)}%
                </span>
              </p>
            </div>

            <p className="text-white text-sm">{usdcBalance}</p>
          </div>
        </div>
      ) : (
        <div className="h-[200px] flex flex-col gap-6 px-4 overflow-y-scroll">
          {myWalletData?.nfts.length === 0 ? (
            <span className="text-sm text-red-500 text-center">No NFTS</span>
          ) : (
            myWalletData?.nfts.map((item, index) => (
              <div key={index} className="flex flex-row items-center gap-2.5">
                <div className="w-10 h-10 flex justify-center items-center bg-gray-800 rounded-full">
                  <img src={item.image_url} alt={item.name} />
                </div>

                <div className="flex flex-1 flex-col">
                  <p className="text-white font-semibold">{item.name}</p>
                </div>

                <p className="text-white text-sm">{item.identifier}</p>
              </div>
            ))
          )}
        </div>
      )}

      <div></div>
    </>
  );
}
