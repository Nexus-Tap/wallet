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

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedin, setIsLoggedin] = useAtom(isLoggedInAtom);

  // useEffect(() => {
  //   let encWallet = localStorage.getItem("wallet");

  //   if (encWallet === null) {
  //     navigate("/");
  //   } else {
  //     navigate("/login");
  //     setIsLoggedin(true);
  //   }
  //   console.log(location);
  // }, []);

  return (
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
      </Routes>
      {isLoggedin && location.pathname !== "/login" && <BottomBar />}
      <Toaster />
    </div>
  );
}

export default App;
