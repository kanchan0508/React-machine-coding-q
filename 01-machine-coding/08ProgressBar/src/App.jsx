import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProgressBar from './components/ProgressBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1 className='font-bold text-2xl'>Progress Bar</h1>
    <ProgressBar />
    </>
  )
}

export default App
