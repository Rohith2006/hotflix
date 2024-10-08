import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MovieSite from './pages/MovieSite'
import HotFlix from './pages/HotFlix'
import { Dice1 } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='w-[100vw] h-[100vh]'>
        <HotFlix/>
      </div>
        
  )
}

export default App
