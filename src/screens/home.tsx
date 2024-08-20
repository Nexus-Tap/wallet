import { IoIosArrowDown } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { walletAtom, walletData } from "@/atom/global";
import { useEffect, useState } from "react";
import { getWallet } from "@/apis/wallet";

import { FaCoins } from "react-icons/fa6";
import { RiQrScan2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { getWalletAddress, sendEth, signMessage } from "@/sdk";
import { getReqData } from "@/apis/sdk";

export default function HomeScreen() {
  const app = window?.Telegram?.WebApp;

  const navigate = useNavigate();
  const location = useLocation();

  const [wallet] = useAtom(walletAtom);
  const [myWalletData, setMyWalletData] = useAtom(walletData);

  const [seeTokens, setSeeTokens] = useState(true);
  const [dataProcesses, setDataProcesses] = useState(false);

  const initData = async () => {
    const data = await getWallet(wallet?.address!, "sepolia");

    if (data === null) {
      return;
    }

    setMyWalletData(data);
  };

  async function processData() {
    const currentParams = new URLSearchParams(location.search);
    const startappQuery =
      app?.initDataUnsafe?.start_param ?? currentParams.get("startapp");
    let closeWindow = true;

    toast.success(`Data - ${startappQuery}`);

    if (!startappQuery || !wallet || !dataProcesses) return;

    // const startData: {
    //   sessionId: string;
    //   type: string;
    //   data: any;
    // } = JSON.parse(atob(startappQuery));

    // console.log(startData);

    try {
      const data = await getReqData({ sessionId: startappQuery });

      const startData = {
        ...data,
      };

      toast.success(data.toString());

      if (startData.type === "SIGN_MSG") {
        const signedMessage = await signMessage(
          wallet,
          startData.data,
          startData.sessionId
        );

        if (signedMessage) {
          toast.success("Successfully signed the message");
        } else {
          throw new Error("Failed to store the signature");
        }
      } else if (startData.type === "CONNECT") {
        const walletAddress = await getWalletAddress(
          wallet,
          startData.sessionId
        );

        if (walletAddress) {
          toast.success("Successfully connected");
        } else {
          throw new Error("Failed to connect to wallet");
        }
      } else if (startData.type === "SEND_TXN") {
        closeWindow = false;

        navigate("/send", {
          state: startData,
        });
      }
    } catch (error: any) {
      console.error(error?.message, error);
      toast.error(error?.message ?? "Error performing action");
    } finally {
      setDataProcesses(true);
      if (closeWindow) {
        window.close();
      }
    }
  }

  useEffect(() => {
    if (!wallet) return;

    initData();
    processData();
  }, [wallet]);

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
              {wallet?.address.slice(0, 5)}...
              {wallet?.address.slice(
                wallet.address.length - 4,
                wallet.address.length
              )}{" "}
              <IoIosArrowDown className="ml-3" />{" "}
            </p>
            <p className="text-white text-[9px] flex items-center">
              {" "}
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>{" "}
              Ethereum Main network
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
          {myWalletData?.balance.toFixed(4)} ETH
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
            // onSend();
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
          {myWalletData?.tokens.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-2.5">
              <div className="w-10 h-10 flex justify-center items-center bg-gray-800 rounded-full">
                <FaCoins className="text-gray-200" size={24} />
              </div>

              <div className="flex flex-1 flex-col">
                <p className="text-white font-semibold">{item.name}</p>

                <p className="text-sm flex flex-row gap-2">
                  <span className="text-gray-400">
                    ${item.price.toFixed(2)}
                  </span>

                  <span
                    className={cn(
                      item.percent_change < 0
                        ? "text-red-600"
                        : "text-green-300"
                    )}
                  >
                    {item.percent_change > 0 ? "+" : ""}
                    {item.percent_change.toFixed(2)}%
                  </span>
                </p>
              </div>

              <p className="text-white text-sm">{item.balance}</p>
            </div>
          ))}
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
