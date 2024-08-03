import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import WelcomeScreen from './screens/auth/welcome';
import ChooseAuthScreen from './screens/auth/auth';

function App() {

  return (
    <div className="w-screen min-h-screen bg-black flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/auth" element={<ChooseAuthScreen />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
