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

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const app = window.Telegram.WebApp;

  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);
  const [data, setData] = useState(null);

  useEffect(() => {
    const encWallet = localStorage.getItem("wallet");

    if (encWallet === null) {
      navigate("/");
    } else {
      navigate("/login");
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleMessage = (event: MessageEvent) => {
    console.log(event);

    setData(event.data);

    if (event.data.type === "SIGN_REQUEST") {
      // setMessageToSign(event.data.message);
      // handleSign();
    }
  };

  const handleSign = () => {
    // Implement your signing logic here
    const signature = `signed - ${app.initDataUnsafe.start_param}`;

    app.sendData(signature);
    alert(window.parent.window);
    app.openLink("http://localhost:5174/");
    // app.openLink("http://localhost:5174/?signature=" + signature);

    window.opener.postMessage({ type: "SIGNATURE_RESULT", signature }, "*");

    window.parent.postMessage({ type: "SIGNATURE_RESULT", signature }, "*");
  };

  return (
    <>
      <button className="bg-blue-400 w-20" onClick={handleSign}>
        {app.initDataUnsafe.start_param}
      </button>

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
        </Routes>

        {isLoggedin && location.pathname !== "/login" && <BottomBar />}

        <Toaster />
      </div>
    </>
  );
}

export default App;
