import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { useAtom } from "jotai";
import { walletAtom } from "../../../atom/global";
import { useNavigate } from "react-router-dom";


export default function GenerateSeedPhrase() {


    const [isBlured, setIsBlured] = useState(true);
    let [words, setWords] = useState<string[] | undefined>([]); 
    let [, setWallet] = useAtom(walletAtom);

    const navigate = useNavigate();


    const generateWallet = async () => {
        let wallet = ethers.Wallet.createRandom();
        setWords(wallet.mnemonic?.phrase.split(" "));
        setWallet(wallet);
    }


    useEffect(()=>{
        generateWallet();
    },[])

    return (

        <div className="w-full h-screen flex flex-col px-8 pt-14">

            <p className="text-white text-3xl font-bold">Write down your secret recovery phrase</p>

            <p className="text-gray-400 text-sm mt-5 text-justify">Save your secret recovery phrase. Write it down on a paper to keep it in a safe place. You'll asked to re-enter your secret recovery phrase in the next step.</p>

            <div className="w-full flex justify-center">
                <div className="relative w-full h-[250px] rounded-lg bg-gray-800 mt-10 overflow-hidden">

                    <div className={`relative text-white text-[10px] p-2 flex flex-wrap justify-between items-center ${isBlured && "blur-sm"}`}>

                        {
                            words?.map((word) => (
                                <div key={word} className="flex justify-center items-center w-20 h-10 rounded-lg border-white border-[1px] m-2">
                                    <p>{word}</p>
                                </div>
                            ))
                        }

                    </div>

                    {
                        isBlured &&
                        (
                            <div className="absolute inset-0 flex flex-col p-5 backdrop-blur-lg bg-transparent rounded-lg">
                                <span className="text-xl font-bold text-white mt-4">Tap to reveal your Secret Phrase</span>
                                <span className="text-sm text-gray-100 mt-2 font-semibold">Make sure no one is watching you.</span>

                                <button onClick={() => setIsBlured(false)} className="w-full flex justify-center items-center border-gray-300 border-[1px] shadow-md h-12 px-4 mt-10 rounded-md">
                                    <p className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Reveal</p>
                                </button>
                            </div>
                        )
                    }

                </div>
            </div>

            <div className="w-full flex flex-1 flex-col justify-end">
                <button disabled={isBlured} onClick={()=> navigate("/auth/set-wallet-password")} className="w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold">
                    Create Wallet
                </button>
            </div>

        </div>

    )

}