import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <h1 className="text-5xl font-bold mb-4">Vite + React + Tailwind</h1>
      <p className="mb-6">Count is 0</p>
      <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500 transition">
        Click me
      </button>
    </div>
  );
}

export default App;
