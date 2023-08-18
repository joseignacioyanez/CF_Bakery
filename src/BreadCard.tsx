import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import React, { FC } from "react";


interface BreadCardProps {
    disponible: boolean;
    codigo: string;
    nombre: string;
    url: string;
    precioAfiliado?: number;
    precioNoAfiliado?: number;
}

function correctFormat(input: string): string {
    // Replace special characters and capitalize words
    const corrected = input
        .replace(/[^A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]/g, "") // Remove non-alphabetic characters except spaces
        .replace(/\w+/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()); // Capitalize words
    
    return corrected;
}

export const BreadCard:FC<BreadCardProps> = (props)  => {

    return <>
            <Card
            key={props.codigo}
            sx={{
                margin: '10px',
                height: 'auto',
                minHeight: '34vh',
                width: '15vw',
                display: 'flex',
                flexDirection:'column',
                justifyContent: 'space-between',
            }}>
                <CardMedia 
                    component="img" alt={correctFormat(props.nombre)} 
                    sx={{ height: 140}}
                    image={props.url.replace('linuxlocal', '10.80.4.172')} />
                
                <CardContent
                sx={{
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'space-between',
                    height:'100%'
                }}>
                    
                        <Typography gutterBottom variant="h5" component="div" style={{ alignSelf: 'flex-start' }}>
                            {correctFormat(props.nombre)}
                        </Typography>
                        <Typography  gutterBottom variant="h5" component="div" color="text.secondary" sx={{width:'100%', margin:'10px'}}>
                            {props.precioAfiliado != null ? props.precioAfiliado : '$0.00'}
                        </Typography>
                    
                    <Button variant="contained" color="success" style={{ alignSelf: 'flex-end', width:'100%' }}>Agregar</Button>
                </CardContent>
            </Card>
</>
}
