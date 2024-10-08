import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { GameContextProvider } from './context/GameContext'
import Login from './components/Login'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>,
)
