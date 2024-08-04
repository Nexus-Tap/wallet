


export default function GenerateSeedPhrase() {

    return (

        <div className="w-full h-screen flex flex-col px-8 pt-14">

            <p className="text-white text-3xl font-bold">Write down your secret recovery phrase</p>

            <p className="text-gray-400 text-sm mt-5 text-justify">Save your secret recovery phrase. Write it down on a paper to keep it in a safe place. You'll asked to re-enter your secret recovery phrase in the next step.</p>

            <div className="w-full flex justify-center">

                <div className="w-full h-[200px] rounded-lg bg-white mt-10">

                </div>
            </div>

            <div className="w-full justify-center flex flex-1 flex-col justify-end">
                <button className="w-full flex justify-center items-center bg-gray-900 shadow-md h-12 px-4 mb-7 rounded-md">
                    <p className=" font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">Create Wallet</p>
                </button>
            </div>

        </div>

    )

}