import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { isLoggedInAtom, walletAtom } from "../atom/global";
import { Wallet } from "ethers";
import toast from 'react-hot-toast';


export default function LoginScreen() {

    const [password, setPassword] = useState("");
   
    const [invalidPassword, setInvalidPassword] = useState(false);
    let [,setWallet] = useAtom(walletAtom);
    let [,setIsLoggedin] = useAtom(isLoggedInAtom);

    const navigate = useNavigate();

    const login = async () => {

        let encWallet = localStorage.getItem("wallet")!;
        console.log("helll")

        try {
            let wallet = await Wallet.fromEncryptedJson(encWallet,password);
            setWallet(wallet);
            navigate("/home");
        } catch {
            toast.error(
                "Invalid Password, please try again.",
                {
                    duration: 4000, 
                    icon: '⚠️',
                }
            );
        }


    }

    return (

        <div className="w-full h-screen flex flex-col px-8 pt-14">

            <p className="text-white text-3xl font-bold">Login</p>

            <div className="mt-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="w-full flex flex-1 flex-col justify-end">
                <button onClick={login} className={`w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold`}>
                    Login
                </button>
            </div>

        </div>

    )

}