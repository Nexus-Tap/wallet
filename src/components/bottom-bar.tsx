import { RiWallet3Line, RiSwapBoxLine, RiFileList3Line, RiSettings2Line } from "react-icons/ri";


export default function BottomBar() {
    return (

        <div className="fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-gray-900 border-gray-800">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <button type="button" className="inline-flex flex-col items-center justify-center px-5 group">
                    <RiWallet3Line className="text-white" size={20} />
                    <span className="text-[12px] text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Wallet</span>
                </button>
                <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <RiSwapBoxLine className="text-white" size={20} />
                    <span className="text-[12px] text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Swap</span>
                </button>
                <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <RiFileList3Line className="text-white" size={20} />
                    <span className="text-[12px] text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Transactions</span>
                </button>
                <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                    <RiSettings2Line className="text-white" size={20} />
                    <span className="text-[12px] text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Settings</span>
                </button>
            </div>
        </div>

    );
}