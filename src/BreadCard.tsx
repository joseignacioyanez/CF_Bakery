import { Card, CardContent, CardMedia, Typography  } from "@mui/material";
import { FC } from "react";

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
        margin: '4px',
        height: '21vh',
        width: 'auto',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
        border: '1px solid #5DBB6340',
        boxShadow: '20',
        backgroundColor: '#5DBB6340',
    }

    const unselectedCardStyle = {
        margin: '4px',
        padding: '0px !important',
        height: '21vh',
        width: 'auto',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between',
    }


    return <div onClick={() => onClick(bread)} style={{ cursor: 'pointer' }}>
            <Card
            key={bread.codigoItem}
            sx={isSelected ? selectedCardStyle : unselectedCardStyle}>
                <CardMedia 
                    component="img" alt={correctFormat(bread.nombre)} 
                    sx={{ 
                        height: '12vh',
                        padding: '0px !important',
                    }}
                    image={bread.url.replace('linuxlocal', '10.80.4.172')} />
                
                <CardContent
                sx={{
                    height:'19vh',
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'space-evenly',
                    alignItems:'center',
                    padding: '0px !important',
                }}>
                    <Typography variant='body2' component="div" sx={{fontSize:'0.95rem', textAlign:'center', maxHeight:'5vh', overflow:'hidden', }} >
                        {correctFormat(bread.nombre)}
                    </Typography>

                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'0.9rem'}}>
                        {/*Si se ha seleccionado el producto, mostrar precio total en lugar de unitario*/}
                        {isAffiliated ? 
                                isSelected ? 
                                    bread.precioAfiliado != null ? formatPrice(bread.precioAfiliado * quantity) : 'Cant: ' + quantity + ' Tot: $'+ formatPrice(0.10*quantity)
                                :
                                    bread.precioAfiliado != null ? formatPrice(bread.precioAfiliado) : '$'+ '0.10' + ' c/u'
                            ://No Afiliado
                                isSelected ? 
                                    bread.precioNoAfiliado != null ? formatPrice(bread.precioNoAfiliado * quantity) : 'Cant: ' + quantity + 'Tot: $'+ formatPrice(0.10 * quantity)
                                :
                                    bread.precioNoAfiliado != null ? formatPrice(bread.precioNoAfiliado) : '$'+ '0.10' + ' c/u'
                        }    
                    </Typography>
                </CardContent>
            </Card>
</div>
}
