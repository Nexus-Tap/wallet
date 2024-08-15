import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { IoMdQrScanner } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";


export default function SendPage() {

    const [toWalletAddr, setToWalletAddr] = useState("");
    const [coinCount, setCoinCount] = useState(0);
    const [cryptoType, setCryptoType] = useState("ETH");

    const location = useLocation();

    const {qrData} = location.state || {};
    
    useEffect(()=>{
        if(qrData !== "") {
            setToWalletAddr(qrData);
        }
    },[])

    const navigate = useNavigate();

    return (

        <div className="mt-[50px] px-4">

            <p className="text-gray-400 text-lg">To</p>


            <form className="max-w-lg mt-2">
                <div className="flex">
                    <div className="relative w-full">
                        <input value={toWalletAddr} onChange={(e) => setToWalletAddr(e.target.value)} type="text" className="block p-2.5 w-full z-20 text-sm  rounded-e-lg border-s-2 border bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white focus:border-blue-500" placeholder="0xCadasd..." required />
                        <button onClick={() => navigate("/scanner")} type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border-l-[1px] focus:ring-4 focus:outline-none">
                            <IoMdQrScanner size={24} />
                        </button>
                    </div>
                </div>

                <div className="flex w-full max-w-sm items-center space-x-2 mt-10">
                    <Select onValueChange={setCryptoType} value={cryptoType}>
                        <SelectTrigger className="w-[100px] bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white">
                            <SelectGroup>
                                <SelectLabel>Token</SelectLabel>
                                <SelectItem value="ETH">ETH</SelectItem>
                                <SelectItem value="USDC">USDC</SelectItem>
                                <SelectItem value="USDT">USDT</SelectItem>
                                <SelectItem value="DAI">DAI</SelectItem>
                                <SelectItem value="WBTC">WBTC</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Input type="number" min={0} value={coinCount} onChange={(e)=> setCoinCount(parseInt(e.target.value))} placeholder="0.00" className="bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white" />
                </div>

                <div className="w-full h-[100px] p-3 mt-10 border-[1px] border-gray-500 rounded-lg flex">
                    <div className="w-1/2 h-full flex flex-col justify-between">
                        <p className="text-md text-white font-semibold">Estimated fee</p>
                        <p className="text-xs text-gray-500">Market <span className="text-xs text-green-600">-60 sec</span></p>
                    </div>
                    <div className="w-1/2">
                        <p className="text-xs text-gray-300 text-right">0.00000045</p>
                        <p className="text-xs text-gray-300 text-right">0.00000045 SepoliaETH</p>
                        <p className="text-xs text-gray-300 text-right"><span className="font-bold">Max Fee: </span>0.00000045 SepoliaETH</p>
                    </div>
                </div>

                <div className="flex-1 flex mt-[150px] items-end justify-between">
                    <button
                        onClick={() => navigate("/home")}
                        className="w-[44%] h-10 flex justify-center items-center bg-gray-900 shadow-md py-2 px-4 rounded-md"
                    >
                        <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
                            Reject
                        </p>
                    </button>
                    <button
                        onClick={() => navigate("/home")}
                        className="w-[44%] h-10 flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 rounded-md text-white font-semibold"
                    >
                        Confirm
                    </button>
                </div>
            </form >





        </div >


    );
}