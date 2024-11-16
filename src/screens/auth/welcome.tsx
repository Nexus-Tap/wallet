import { useNavigate } from "react-router-dom";
import GettingStarted from "../../assets/images/getting_started.png";
import { FaArrowRight } from "react-icons/fa6";
import { HaloWallet } from "@/lib/HaloWallet";
import { ethersProvider } from "@/providers/Web3Provider";
import { HaloCommand, HaloOptions, HaloResponse } from "@/interface/global";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { haloAtom } from "@/atom/global";
import toast from "react-hot-toast";

export default function WelcomeScreen() {
  
  const navigate = useNavigate();

  const [, setHalo] = useAtom(haloAtom);

  const loadWallet = async (): Promise<void> => {

    const command: HaloCommand = {
      name: "sign",
      keyNo: 1,
      message: "0123",
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
      console.log(res,"====");
      // toast.error(JSON.stringify(res), {
      //   duration: 4000,
      //   icon: "⚠️",
      // });


      let haloWlt = new HaloWallet(res.etherAddress, ethersProvider.provider as any);
      
      setHalo(haloWlt);
      navigate("/home");


    } catch (e) {
      // the command has failed, display error to the user
      toast.error('Scanning failed, click on the button again to retry. Details: ' + (e instanceof Error ? e.message : String(e)), {
        duration: 4000,
        icon: "⚠️",
      });
    }
  };

  return (
    <>
      <div className="w-full flex justify-center pt-10">
        <img
          src={GettingStarted}
          alt="Getting Started"
          className="w-[80%] md:w-[400px]"
        />
      </div>

      <div className="px-10 mt-3 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-2xl font-bold">Welcome to Nexus Pay</p>
          <p className="mt-3 text-gray-400 text-[14px]">
            Ready to Yoink Some Coins? Let's Get You Started! 🪙🚀
          </p>
        </div>
        <button
          onClick={loadWallet}
          className="w-full bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold flex items-center justify-between"
        >
          Get Started
          <FaArrowRight />
        </button>
      </div>
    </>
  );
}
