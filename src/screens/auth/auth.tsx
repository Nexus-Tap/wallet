import GettingStarted from "../../assets/images/getting_started.png";
import { FaArrowRight } from "react-icons/fa6";

export default function ChooseAuthScreen() {


  return (
    <>
      <div className="w-full mt-[150px] flex justify-center items-center">
        <p className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Coin Yoink</p>
      </div>

      <div className="p-10 flex-1 flex flex-col justify-end">
        <button className="w-full flex justify-center items-center bg-gray-900 shadow-md py-2 px-4 mb-7 rounded-md">
          <p className=" font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Import using Seed Phrase</p>
        </button>
        <button className="w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold">
          Create a New Wallet
        </button>
      </div>

      {/* <div className="px-10 mt-3 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-2xl font-bold">Welcome to CoinYoink!</p>
          <p className="mt-3 text-gray-400 text-[14px]">Ready to Yoink Some Coins? Let's Get You Started! 🪙🚀</p>
        </div>
        <button className="w-full bg-gradient-to-r from-blue-500 to-green-500 py-2 px-4 mb-10 rounded-md text-white font-semibold flex items-center justify-between">
          Get Started
          <FaArrowRight className="text-gray-700" />
        </button>
      </div> */}



    </>
  );
}