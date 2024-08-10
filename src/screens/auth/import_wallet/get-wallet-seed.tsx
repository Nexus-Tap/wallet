import { ethers } from "ethers";
import { useAtom } from "jotai";
import { walletAtom } from "../../../atom/global";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function GetWalletFromSeed() {
  const inputs = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "12",
    "13",
  ];
  const [, setWallet] = useAtom(walletAtom);

  const navigate = useNavigate();

  const fetchWallet = async () => {
    console.log(inputs);
    try {
      const mneumonic = inputs.toString().replace(/,/g, " ");
      const wallet = ethers.Wallet.fromPhrase(mneumonic);
      setWallet(wallet);
      navigate("/auth/set-wallet-password");
    } catch (e) {
      console.log(e);
      toast.error("Invalid Seed! Please try again.", {
        duration: 4000,
        icon: "⚠️",
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col px-8 pt-14">
      <p className="text-white text-3xl font-bold">Recover Wallet from Seed.</p>

      <p className="text-gray-400 text-sm mt-5 text-justify">
        Save your secret recovery phrase. Write it down on a paper to keep it in
        a safe place. You'll asked to re-enter your secret recovery phrase in
        the next step.
      </p>

      <div className="w-full flex justify-center">
        <div className="relative w-full h-[250px] rounded-lg bg-gray-800 mt-10 overflow-hidden">
          <div
            className={`relative text-white text-[10px] p-2 flex flex-wrap justify-between items-center`}
          >
            {inputs?.map((val, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-20 h-10 rounded-lg border-white border-[1px] m-2"
              >
                <input
                  type="text"
                  className="w-full h-full text-black px-3 text-bold font-bold uppercase text-center"
                  onChange={(e) => {
                    inputs[index] = e.target.value;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-1 flex-col justify-end">
        <button
          onClick={fetchWallet}
          className="w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold"
        >
          Recover
        </button>
      </div>
    </div>
  );
}
