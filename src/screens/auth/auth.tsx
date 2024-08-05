import { useNavigate } from "react-router-dom";

export default function ChooseAuthScreen() {

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full mt-[150px] flex justify-center items-center">
        <p className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Coin Yoink</p>
      </div>

      <div className="p-10 flex-1 flex flex-col justify-end">
        <button onClick={()=> navigate("/auth/get-wallet-seed")} className="w-full flex justify-center items-center bg-gray-900 shadow-md py-2 px-4 mb-7 rounded-md">
          <p className=" font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Import using Seed Phrase</p>
        </button>
        <button onClick={()=> navigate("/auth/create-wallet")} className="w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold">
          Create a New Wallet
        </button>
      </div>

    </>
  );
}