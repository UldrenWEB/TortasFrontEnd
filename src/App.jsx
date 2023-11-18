import { Route, Routes, Link } from 'react-router-dom';
import { useState } from 'react'

import AnimatedSroll from './components/AnimatedScroll';
import Table from './components/Table';
import NavBar from './components/Navbar';
import Home from './components/Home';
import MyRoute from './components/Route';

import './styles/App.css'
import Prueba from './components/Prueba';
// const Prueba = () => {
//   return (
//     <div>
//       <h1>Este es elemento de prueba</h1>
//       <ul>
//         <li><Link to="/">Inicio</Link></li>
//         <li><Link to="/home">Home</Link></li>
//       </ul>
//       <AnimatedSroll animation={"fade-left"}>
//         <div className='testDivs'></div>
//       </AnimatedSroll>
//       <AnimatedSroll animation={"fade-left"}>
//         <div className='testDivs'></div>
//       </AnimatedSroll>
//       <AnimatedSroll animation={"fade-left"}>
//         <div className='testDivs'></div>
//       </AnimatedSroll>
//       <AnimatedSroll animation={"fade-left"}>
//         <div className='testDivs'></div>
//       </AnimatedSroll>
//       <AnimatedSroll animation={"fade-left"}>
//         <div className='testDivs'></div>
//       </AnimatedSroll>
//       <AnimatedSroll animation={"fade-left"}>
//         <div className='testDivs'></div>
//       </AnimatedSroll>
//       <AnimatedSroll animation={"fade-left"}>
//         <div className='testDivs'></div>
//       </AnimatedSroll>
//     </div>
//   )
// }

function App() {
  const pruebaData =
    [
      {
        "id": 1,
        "nombre": "Juan",
        "apellido": "Pérez",
        "profesion": "Ingeniero",
        "prueba": "Aqui probando una nueva fila"
      },
      {
        "id": 2,
        "nombre": "Ana",
        "apellido": "Gómez",
        "profesion": "Doctora",
        "prueba": "Aqui probando una nueva fila"
      },
      {
        "id": 3,
        "nombre": "Carlos",
        "apellido": "Rodríguez",
        "profesion": "Abogado",
        "prueba": "Aqui probando una nueva fila"
      }
    ]

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />} />
        <Route path="/home" element={<Prueba />} />
        <Route path="/prueba" element={<MyRoute />} />
      </Routes>
    </>

    // <NavBar />
    // <Table data={pruebaData} customHeaders={['Hola1', 'Hola2', 'Hola3', 'Hola5', 'holaUltimo']} />

  );
}

export default App
