import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import React, { FC } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


interface Bread {
    disponible: string;
    codigoItem: string;
    nombre: string;
    url: string;
    precioAfiliado?: number;
    precioNoAfiliado?: number;
    isSelected: boolean;
}

interface BreadCardProps {
    bread : Bread;
    isSelected: boolean;
    quantity: number;
    isAffiliated: boolean;
    onClick : (bread : Bread) => void;
}

// Porque nombres de panes venian con formato incorrecto, cambiar a solo MAYUSminus cuando se actualice API
function correctFormat(input: string): string {
    const corrected = input
        .replace(/[^A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]/g, "") 
        .replace(/\w+/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase());
    return corrected;
}

const formatPrice = (number: number) => {
    return (Math.round(number * 100) / 100).toFixed(2)
}

export const BreadCard:FC<BreadCardProps> = ({bread, isSelected, onClick, quantity, isAffiliated})  => {

    const selectedCardStyle = {
        margin: '8px',
        height: '29vh',
        width: 'auto',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        border: '1px solid #5DBB6340',
        boxShadow: '20',
        backgroundColor: '#5DBB6340',
    }

    const unselectedCardStyle = {
        margin: '8px',
        height: '22vh',
        width: 'auto',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
    }


    return <>
            <Card
            key={bread.codigoItem}
            sx={isSelected ? selectedCardStyle : unselectedCardStyle}>
                <CardMedia 
                    component="img" alt={correctFormat(bread.nombre)} 
                    sx={{ 
                        height: '10vh',
                    }}
                    image={bread.url.replace('linuxlocal', '10.80.4.172')} />
                
                <CardContent
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'space-between',
                    textAlign:'center',
                    alignItems:'center',
                }}>
                    <div style={{height:'4vh'}}>
                        <Typography variant="h6" component="div" >
                            {correctFormat(bread.nombre)}
                        </Typography>
                    </div>
                    <div style={{height:'4vh', display:'flex',  justifyContent:'space-between', flexDirection:'row', marginTop:'0.5vh'}}>
                        <Typography  variant="h6" component="div" color="text.secondary" sx={{width:'100%', fontSize:'1.3rem', marginRight:'2vw', flex:1}}>
                            {/*Si se ha seleccionado el producto, mostrar precio total en lugar de unitario*/}
                            {isAffiliated ? 
                                    isSelected ? 
                                        bread.precioAfiliado != null ? formatPrice(bread.precioAfiliado * quantity) : 'Tot: $'+ formatPrice(0.10*quantity)
                                    :
                                        bread.precioAfiliado != null ? formatPrice(bread.precioAfiliado) : '$'+ '0.10' + ' c/u'
                                ://No Afiliado
                                    isSelected ? 
                                        bread.precioNoAfiliado != null ? formatPrice(bread.precioNoAfiliado * quantity) : 'Tot: $'+ formatPrice(0.10 * quantity)
                                    :
                                        bread.precioNoAfiliado != null ? formatPrice(bread.precioNoAfiliado) : '$'+ '0.10' + ' c/u'
                            }    
                        </Typography>
                        <Button onClick={() => onClick(bread)} variant='contained' color="success" style={{ height:'5vh', width:'5vh', minWidth:'auto', justifySelf:'flex-end'}}>< AddShoppingCartIcon sx={{fontSize:30}}/></Button>

                    </div>
                </CardContent>
            </Card>
</>
}
