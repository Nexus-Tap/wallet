import { IoIosArrowDown } from "react-icons/io";
import { CiBellOn, CiWallet  } from "react-icons/ci";
import { BsSend } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";

export default function Home() {

    return (
        <>
            <div className="w-screen h-16 bg-gray-950 shadow-xl flex items-center justify-between px-5 pt-6">
                <div className="w-[80%] flex">
                    <div className="rounded-full w-10 h-10 overflow-hidden">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqeBwpk5JRR2Yz27Nr9jmdsC0o-Ewh3m1TBQ&s" alt="" />
                    </div>

                    <div className="w-1/2 flex flex-col justify-center ml-3">
                        <p className="text-white font-bold flex items-center">Floyd Miles <IoIosArrowDown className="ml-3" /> </p>
                        <p className="text-white text-[9px] flex items-center"> <div className="w-2 h-2 bg-blue-600 rounded-full mr-1"></div> Ethereum Main network</p>
                    </div>
                </div>

                <CiBellOn style={{ stroke: "url(#blue-gradient)" }} className="text-white" size={25} />

            </div>

            <div className="w-screen flex flex-col items-center mt-10">

                <p className="text-3xl text-white font-bold">70.42 ETH</p>
                <p className="text-white text-sm">$3000 <span className="text-green-600">+5.24%</span></p>

            </div>

            <div className="w-screen mt-10 px-14 flex justify-between">
                <div className="w-17 h-17 flex flex-col justify-center items-center">
                    <div className="w-12 h-12 flex justify-center items-center bg-gray-900 rounded-full overflow-hidden">
                        <BsSend className="text-gray-200" size={24}/>
                    </div>
                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Send</p>
                </div>

                <div className="w-17 h-17 flex flex-col justify-center items-center">
                    <div className="w-12 h-12 flex justify-center items-center bg-gray-900 rounded-full overflow-hidden">
                        <CiWallet className="text-gray-200" size={24}/>
                    </div>
                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Receive</p>
                </div>

                <div className="w-17 h-17 flex flex-col justify-center items-center">
                    <div className="w-12 h-12 flex justify-center items-center bg-gray-900 rounded-full overflow-hidden">
                        <FaEthereum className="text-gray-200" size={24}/>
                    </div>
                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Buy Eth</p>
                </div>
            </div>
        </>

    );

}