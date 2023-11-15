import Home from './components/Home';
import NavBar from './components/Navbar';
import AnimatedSroll from './components/AnimatedScroll';
import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react'
import './styles/App.css'

const Prueba = () => {
  return (
    <div>
      <h1>Este es elemento de prueba</h1>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/home">Home</Link></li>
      </ul>
      <AnimatedSroll animation={"fade-left"}>
        <div className='testDivs'></div>
      </AnimatedSroll>
      <AnimatedSroll animation={"fade-left"}>
        <div className='testDivs'></div>
      </AnimatedSroll>
      <AnimatedSroll animation={"fade-left"}>
        <div className='testDivs'></div>
      </AnimatedSroll>
      <AnimatedSroll animation={"fade-left"}>
        <div className='testDivs'></div>
      </AnimatedSroll>
      <AnimatedSroll animation={"fade-left"}>
        <div className='testDivs'></div>
      </AnimatedSroll>
      <AnimatedSroll animation={"fade-left"}>
        <div className='testDivs'></div>
      </AnimatedSroll>
      <AnimatedSroll animation={"fade-left"}>
        <div className='testDivs'></div>
      </AnimatedSroll>
    </div>
  )
}

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<NavBar />} />
    //   <Route path='/home' element={<Home />} />
    //   <Route path='/prueba' element={<Prueba />} />
    // </Routes>

    <NavBar/>
  );
}

export default App
