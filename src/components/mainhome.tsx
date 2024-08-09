import { IoIosArrowDown } from "react-icons/io";
import { CiBellOn, CiWallet } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

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
              Floyd Miles <IoIosArrowDown className="ml-3" />{" "}
            </p>
            <p className="text-white text-[9px] flex items-center">
              {" "}
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div>{" "}
              Ethereum Main network
            </p>
          </div>
        </div>

        <CiBellOn
          style={{ stroke: "url(#blue-gradient)" }}
          className="text-white"
          size={25}
          onClick={() => {
            navigate("/scanner");
          }}
        />
      </div>

      <div className="w-screen flex flex-col items-center mt-10">
        <p className="text-3xl text-white font-bold">70.42 ETH</p>
        <p className="text-white text-sm">
          $3000 <span className="text-green-600">+5.24%</span>
        </p>
      </div>

      <div className="w-screen mt-10 px-14 flex justify-between">
        <div className="w-17 h-17 flex flex-col justify-center items-center">
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
        <div className="flex flex-row gap-6 text-white justify-center">
          {[
            { label: "Tokens", active: true },
            { label: "Collectibles", active: false },
          ].map((item, index) => (
            <h3
              key={index}
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

      <div className="flex flex-col gap-6 justify-center px-4">
        {[
          {
            icon: FaEthereum,
            title: "1INCH Token",
            usdVal: "$3.77",
            change: 2.34,
            tokenVal: "10.059 1INCH",
          },
          {
            icon: FaEthereum,
            title: "1INCH Token",
            usdVal: "$3.77",
            change: -2.34,
            tokenVal: "10.059 1INCH",
          },
          {
            icon: FaEthereum,
            title: "1INCH Token",
            usdVal: "$3.77",
            change: 2.34,
            tokenVal: "10.059 1INCH",
          },
        ].map((item, index) => (
          <div key={index} className="flex flex-row items-center gap-2.5">
            <div className="w-10 h-10 flex justify-center items-center bg-gray-800 rounded-full">
              <item.icon className="text-gray-200" size={24} />
            </div>

            <div className="flex flex-1 flex-col">
              <p className="text-white font-semibold">{item.title}</p>

              <p className="text-sm flex flex-row gap-2">
                <span className="text-gray-400">{item.usdVal}</span>

                <span
                  className={cn(
                    item.change < 0 ? "text-red-600" : "text-green-300"
                  )}
                >
                  {item.change > 0 ? "+" : ""}
                  {item.change}
                </span>
              </p>
            </div>

            <p className="text-white text-sm">{item.tokenVal}</p>
          </div>
        ))}
      </div>

      <div></div>
    </>
  );
}
