import { useState } from 'react'
import './App.css'
import Navbar from './blocks/Navbar'
import Hero from './blocks/Hero'
import StudentsData from './blocks/StudentsData'
import Footer from './blocks/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <StudentsData />
      <Footer />
    </>
  )
}

export default App
