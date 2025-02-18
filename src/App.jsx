import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

      </Routes>
    </BrowserRouter>
      
  )
}

export default App
