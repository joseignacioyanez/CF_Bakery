import React, { useState, useEffect } from 'react';
import { Button, Modal } from '@mui/material';
import BakeryMenu from './BakeryMenu'; 
import './App.css';

function App() {

  const [bakeryOpen, setBakeryOpen] = useState(false);

  const openBakery = () => {
    setBakeryOpen(true);
  }

  const closeBakery = () => {
    setBakeryOpen(false);
  } 

  useEffect(() => {
    //PETICION AL SERVICIO PARA CARGAR LOS PANES
    //CUANDO SE ABRA EL MODAL
  


}, [bakeryOpen])

  // Style
  const styleBoton ={
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
  }

  return (
    <div>
      <Button variant="contained" onClick={openBakery} sx={styleBoton}>
        Abrir Panadería
      </Button>

      <BakeryMenu isOpen={bakeryOpen} onClose={closeBakery} />
    </div>
  );
}

export default App;
