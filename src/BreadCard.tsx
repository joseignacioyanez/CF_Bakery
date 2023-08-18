import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import React, { FC } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


interface Bread {
    disponible: boolean;
    codigo: string;
    nombre: string;
    url: string;
    precioAfiliado?: number;
    precioNoAfiliado?: number;
}

interface BreadCardProps {
    bread : Bread;
    onClick : (bread : Bread) => void;
}

function correctFormat(input: string): string {
    // Replace special characters and capitalize words
    const corrected = input
        .replace(/[^A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]/g, "") // Remove non-alphabetic characters except spaces
        .replace(/\w+/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()); // Capitalize words
    
    return corrected;
}

export const BreadCard:FC<BreadCardProps> = ({bread, onClick})  => {

    return <>
            <Card
            key={bread.codigo}
            sx={{
                margin: '8px',
                height: '39vh',
                width: 'auto',
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'space-between',
            }}>
                <CardMedia 
                    component="img" alt={correctFormat(bread.nombre)} 
                    sx={{ 
                        height: '22vh'
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
                    <div style={{height:'8vh'}}>
                        <Typography variant="h6" component="div" >
                            {correctFormat(bread.nombre)}
                        </Typography>
                    </div>
                    <div style={{height:'9vh', display:'flex',  justifyContent:'space-between', flexDirection:'row', marginTop:'0.5vh'}}>
                        <Typography  variant="h6" component="div" color="text.secondary" sx={{width:'100%', fontSize:'1.3rem', marginRight:'2vw', flex:1}}>
                            {bread.precioAfiliado != null ? bread.precioAfiliado : '$0.00 c/u'}
                        </Typography>
                        <Button onClick={() => onClick(bread)} variant='contained' color="success" style={{ height:'5vh', width:'5vh', minWidth:'auto', justifySelf:'flex-end'}}>< AddShoppingCartIcon sx={{fontSize:30}}/></Button>

                    </div>
                </CardContent>
            </Card>
</>
}
