import { useState } from 'react'
import MovieSite from './pages/MovieSite'
import HotFlix from './pages/HotFlix'
import { Dice1 } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className='w-screen h-screen'>
        <HotFlix/>
      </div>
        
  )
}

export default App
