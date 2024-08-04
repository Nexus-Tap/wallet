import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import WelcomeScreen from './screens/auth/welcome';
import ChooseAuthScreen from './screens/auth/auth';
import GenerateSeedPhrase from './screens/auth/create_wallet/get_seed';

function App() {

  return (
    <div className="w-screen min-h-screen bg-black flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/auth" element={<ChooseAuthScreen />} />
          <Route path="/auth/create-wallet" element={<GenerateSeedPhrase />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
