import { Route, Routes, Link } from 'react-router-dom';
import { useEffect, useState } from 'react'

import AnimatedSroll from './components/AnimatedScroll';
import ComponentTable from './components/Table';
import NavBar from './components/Navbar';
import Home from './components/Home';
import MyRoute from './components/Route';
import Chat from './components/Chat';
import iClient from './instances/iClientSocket';
import './styles/App.css'
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
// let json;
// getData().then(data => {
//   json = data
// }).catch(err => {
//   console.error('Hubo un error:', err)
// })
function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateName() {
  let name1 = ["uldren", "julio", "erika", 'ramon', 'william', 'finol', 'garcia', 'gabi', 'sol']


  var name = capFirst(name1[getRandomInt(0, name1.length + 1)]);
  return name;

}
const objUser = {
  user: generateName(),
  password: '1234',
  profile: '123'
}
const socketClient = iClient.createSocketClient(objUser)
iClient.joinNamespace(socketClient);
iClient.joinRoom(socketClient, 'el prado')
iClient.listenEvents(socketClient)
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

  const mensajes = [
    { fecha: '8/17/2023', usuario: 'Uldren', emisor: 'Uldren', contenido: 'Hola como estan', receptor: 'Sol' },
    { fecha: '9/17/2023', usuario: 'Uldren', emisor: 'Hermana', contenido: 'Hola como estas Uldren', receptor: 'Uldren' },
    { fecha: '10/17/2023', usuario: 'Uldren', emisor: 'Mama', contenido: 'Hola como estas Uldren', receptor: 'Uldren' },
    { fecha: '11/17/2023', usuario: 'Uldren', emisor: 'Novia', contenido: 'Hola como estas Uldren', receptor: 'Uldren' },
    { fecha: '12/17/2023', usuario: 'Uldren', emisor: 'Papa', contenido: 'Hola como estas Uldren', receptor: 'Uldren' },
  ]

  const OBJ_CHAT = {
    zones: ['el prado', 'sur', 'prolongacion'],
    direct: 'direct',
    broadcast: 'namespace'
  }

  const objInfo = {
    socketEmit: socketClient,
    byUser: 'uldren12'
  }


  return (
    // <>
    //   <Routes>
    //     <Route path="/" element={<NavBar />} />
    //     <Route path="/home" element={<Home />} />
    //     <Route path="/prueba" element={<MyRoute />} />
    //   </Routes>
    // </>

    // <NavBar />
    // <ComponentTable data={json} />
    <Chat messagesInitial={mensajes} objChat={OBJ_CHAT} objInfo={objInfo} typeChat={'broadcast'} />

  );
}

export default App
