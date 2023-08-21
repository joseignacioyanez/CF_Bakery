import React, { useState } from 'react';
import { Button, Typography, Dialog } from '@mui/material';
import { Container } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Bread {
    disponible: string;
    codigoItem: string;
    nombre: string;
    url: string;
    precioAfiliado?: number;
    precioNoAfiliado?: number;
    isSelected: boolean;
}

interface QuantityModalProps {
  item: Bread | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (item: Bread, quantity: number) => void;
}

const formatPrice = (number: number) => {
  return (Math.round(number * 100) / 100).toFixed(2)
}

const QuantityModal: React.FC<QuantityModalProps> = ({ item, open, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  const handleConfirm = () => {
    if (item) {
        onClose();
        onConfirm(item, quantity);
        setQuantity(1);
    }
  };

  const handleCancel = () => {
    onClose();
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity+1);
  }

  const decreaseQuantity = () => {
    if (quantity > 0){
        setQuantity(quantity-1);
    }
  }

  return (
    <Dialog open={open} onClose={handleCancel}>
      <Container style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        textAlign:'center',
        height:'40vh',
        width:'35vw',
      }}>
        <Typography variant="h4" >¿Cuántos?</Typography>
        
        <Container 
        style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            textAlign:'center',
        }}>
            <Button 
                variant='contained' 
                color='primary' 
                onClick={decreaseQuantity}
                style={{ height:'5vh', width:'5vh', minWidth:'auto', justifySelf:'flex-end'}}
            >
                < RemoveIcon sx={{fontSize:30}}/>
            </Button>
            {/*Cantidad*/}
            <Typography
            sx={{
                fontSize:'2rem',
            }}>{quantity}</Typography>
            <Button 
                variant='contained' 
                color="primary" 
                style={{ height:'5vh', width:'5vh', minWidth:'auto', justifySelf:'flex-end'}}
                onClick={increaseQuantity}
                >
                    
                < AddIcon sx={{fontSize:30}}/>
            </Button>
        </Container>
        
        {/*Precio*/}
        <Typography
            sx={{
                fontSize:'1.5rem',
                color: 'gray'
            }}>{'Total: $ ' + formatPrice(quantity*0.1) }</Typography>

        <Container 
        style={{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly',
            alignItems:'center',
            textAlign:'center',
        }}>
            {/* Botones para Cancelar y aceptar*/}
            {quantity !== 0? 
                <Container
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'space-between',
                        height:'10vh'
                    }}>
                    <Button onClick={handleCancel} variant='contained' color="error" style={{ height:'auto', width:'22%', minWidth:'auto'}}>Cancelar</Button>
                    <Button onClick={handleConfirm} variant='contained' color="success" style={{ height:'auto', width:'70%', minWidth:'auto',}}>Añadir {quantity} {quantity===1 ? 'unidad' : 'unidades'} de <br/> {item ? item.nombre : 'Pan'} a la Compra</Button>
                </Container>
            : 
            <Container
            style={{
                display:'flex',
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center',
                height:'10vh'
            }}>
                <Button onClick={handleCancel} variant='contained' color="error" style={{ height:'auto', width:'50%', minWidth:'auto', maxHeight:'7vh'}}>Cancelar</Button>        
            </Container>
            }
        </Container>
      </Container>
    </Dialog>
  );
};

export default QuantityModal;
