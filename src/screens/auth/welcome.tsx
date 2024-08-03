import { useNavigate } from "react-router-dom";
import GettingStarted from "../../assets/images/getting_started.png";
import { FaArrowRight } from "react-icons/fa6";

export default function WelcomeScreen() {

    const navigate = useNavigate();

    return (
        <>

            <div className="w-full flex justify-center pt-10">
                <img src={GettingStarted} alt="Getting Started" className="w-[80%] md:w-[400px]" />
            </div>

            <div className="px-10 mt-3 flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-2xl font-bold">Welcome to CoinYoink!</p>
                    <p className="mt-3 text-gray-400 text-[14px]">Ready to Yoink Some Coins? Let's Get You Started! 🪙🚀</p>
                </div>
                <button onClick={()=>navigate("/auth")} className="w-full bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold flex items-center justify-between">
                    Get Started
                    <FaArrowRight />
                </button>
            </div>



        </>
    );
}