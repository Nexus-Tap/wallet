import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { useState } from "react";
import { useAtom } from "jotai";
import { walletAtom, walletData } from "@/atom/global";
import { IoArrowBack } from "react-icons/io5";

export default function ReceivePage() {
  const navigate = useNavigate();

  const [wallet] = useAtom(walletAtom);

  return (
    <>
      <div className="px-4 mt-5 flex">
        <button onClick={() => navigate("/home")}>
          <IoArrowBack size={32} className="text-white" />
        </button>
        <p className="text-white text-xl font-bold ml-[90px]">Recieve Payment</p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center px-8">
        <h3 className="text-white text-lg mt-10 mb-6">Scan to Receive Funds</h3>

        <div className="max-w-full">
          <QRCode value={`${wallet?.address.toString()}`} />
        </div>

        <button
          onClick={() => { }}
          className="w-full mt-10 flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold"
        >
          Copy Wallet Address
        </button>
      </div>
    </>
  );
}
