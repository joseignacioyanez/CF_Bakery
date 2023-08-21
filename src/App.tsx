import React, { useState } from 'react';
import { Button } from '@mui/material';
import BakeryMenu from './BakeryMenu'; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'// Revisar

// Clases para enviar y recibir items para el carrito
interface Bread {
  disponible: string;
  codigoItem: string;
  nombre: string;
  url: string;
  precioAfiliado?: number;
  precioNoAfiliado?: number;
  isSelected: boolean;
}

interface CartItem{
  bread: Bread;
  quantity : number;
}

interface AppProps {
  cart?: CartItem[]
}

const App : React.FC<AppProps> = () =>{

  const [bakeryOpen, setBakeryOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const isAffiliated = true;

  const openBakery = () => {
    setBakeryOpen(true);
  }

  const closeBakery = () => {
    setBakeryOpen(false);
  } 

  const cleanCart = () =>{
    setCart([]);
  }

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

      <Button variant="contained" color='error' onClick={cleanCart} sx={styleBoton} style={{top:'60%'}}>
        Limpiar Carro
      </Button>

      {/*Mostrar contenido de Carrito*/}
      <pre>
      {JSON.stringify(cart, undefined, 2)}
      </pre>

      <BakeryMenu previousItems={cart} isOpen={bakeryOpen} onClose={closeBakery} setCart={setCart} isAffiliated={isAffiliated} />
    </div>
  );
}

export default App;
