import { useState } from 'react'
import './App.css'

function App() {
const [message, setMessage] = useState<string>('Hi there!')

async function onClick() {
  const rest = await fetch(import.meta.env.VITE_APP_API_URL)
  const data = await rest.json()
  setMessage(data.message)
}




  return (
  <div className="App">
    <div className='card'>
      <button onClick={onClick}>Message is <i>{message}</i> </button>
      </div>

    </div>
  )
}

export default App
