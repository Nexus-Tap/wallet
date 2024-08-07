import { useNavigate } from "react-router-dom";
import HomeComp from "../components/home";

export default function HomeScreen() {
  const navigate = useNavigate();

  return (
    <>
      {/* <div className="px-10 mt-10 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-2xl font-bold text-white">Welcome to CoinYoink!</p>
          <p className="mt-3 text-gray-400 text-[14px]">
            Ready to Yoink Some Coins? Let's Get You Started! 🪙🚀
          </p>
        </div>
      </div> */}

      <HomeComp />
    </>
  );
}
