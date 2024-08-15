import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import WelcomeScreen from "./screens/auth/welcome";
import ChooseAuthScreen from "./screens/auth/auth";
import GenerateSeedPhrase from "./screens/auth/create_wallet/get_seed";
import SetWalletPassword from "./screens/auth/create_wallet/set_password";
import HomeScreen from "./screens/home";
import { Toaster } from "react-hot-toast";
import LoginScreen from "./screens/ask-login";
import GetWalletFromSeed from "./screens/auth/import_wallet/get-wallet-seed";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "./atom/global";
import BottomBar from "./components/bottom-bar";
import ScannerPage from "./screens/auth/scanner";
import ReceivePage from "./screens/auth/recieve";
import SendPage from "./screens/send";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const app = window.Telegram.WebApp;

  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 700);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 500);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const encWallet = localStorage.getItem("wallet");
    const currentParams = new URLSearchParams(location.search);
    const query = currentParams.toString();

    if (encWallet === null) {
      navigate(`/?${query}`);
    } else {
      navigate(`/login?${query}`);
      setIsLoggedin(true);
    }
  }, []);

  if (isLargeScreen) {
    return (
      <div className="w-screen h-screen bg-white flex justify-center items-center">
        <p className="text-xl text-red-500">
          Can only be used inside telegram mini app.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-screen min-h-screen bg-black flex flex-col">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/auth" element={<ChooseAuthScreen />} />

          <Route path="/auth/create-wallet" element={<GenerateSeedPhrase />} />
          <Route path="/auth/get-wallet-seed" element={<GetWalletFromSeed />} />

          <Route
            path="/auth/set-wallet-password"
            element={<SetWalletPassword />}
          />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route path="/scanner" element={<ScannerPage />} />
          <Route path="/receive" element={<ReceivePage />} />
          <Route path="/send" element={<SendPage />} />
        </Routes>

        {isLoggedin && location.pathname !== "/login" && <BottomBar />}

        <Toaster />
      </div>
    </>
  );
}

export default App;
