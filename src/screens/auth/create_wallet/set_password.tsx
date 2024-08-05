import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { walletAtom } from "../../../atom/global";
import { useNavigate } from "react-router-dom";


export default function SetWalletPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatch,setPasswordMatch] = useState(false);
        
    let [wallet,] = useAtom(walletAtom);

    const navigate = useNavigate();


    const encryptWallet = async () => {
        let encryptWallet = await wallet?.encrypt(password)!;
        localStorage.setItem("wallet", encryptWallet);
        navigate("/home");
    }

    useEffect(() => {
        if (wallet === null) {
            navigate("/auth/create-wallet");
        }
    }, [])


    useEffect(()=>{
        if (password === confirmPassword && password.length > 8) {
            setPasswordMatch(true);
            return;
        }
        setPasswordMatch(false);
    },[password, confirmPassword])

    return (

        <div className="w-full h-screen flex flex-col px-8 pt-14">

            <p className="text-white text-3xl font-bold">Set Password</p>

            <p className="text-gray-400 text-sm mt-5 text-justify">Choose a string password between length 8 - 16.</p>

            <div className="mt-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>

            {
                !passwordMatch &&
                <p className="text-sm text-red-500 mt-5">Passwords doesn't match or should be between 8 - 18.</p>
            }

            <div className="w-full flex flex-1 flex-col justify-end">
                <button onClick={encryptWallet} disabled={!passwordMatch} className={`w-full flex items-center justify-center bg-gradient-to-r from-green-400 to-purple-400 py-2 px-4 mb-10 rounded-md text-white font-semibold ${!passwordMatch && "blur-sm"}`}>
                    Create Wallet
                </button>
            </div>

        </div>

    )

}