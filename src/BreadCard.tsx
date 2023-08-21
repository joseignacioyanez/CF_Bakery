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
        padding: '0px !important',
        height: '28vh',
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
        height: '28vh',
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
                        height: '15vh',
                        padding: '0px !important',
                    }}
                    image={bread.url.replace('linuxlocal', '10.80.4.172')} />
                
                <CardContent
                sx={{
                    height:'13vh',
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'space-evenly',
                    alignItems:'center',
                    padding: '0px !important',
                }}>
                    <Typography variant='body2' component="div" sx={{fontSize:'1rem', textAlign:'center', maxHeight:'7vh', overflow:'hidden', }} >
                        {correctFormat(bread.nombre)}
                    </Typography>

                    
                        {/*Si se ha seleccionado el producto, mostrar precio total en lugar de unitario*/}
                        {/* En desarrollo, no tenog los precios por lo que valido si es null, despues simplificar */}
                        {isSelected ? 
                            isAffiliated ?  /* Afiliado - Seleccionado */
                                bread.precioAfiliado != null ?
                                    <>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Cantidad: ' + quantity}</Typography>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Total: $'+ formatPrice(bread.precioAfiliado*quantity)}</Typography>
                                    </>
                                :
                                    <>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Cantidad: ' + quantity}</Typography>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Total: $'+ formatPrice(0.10*quantity)}</Typography>
                                    </>
                            :
                                bread.precioNoAfiliado != null ? /* No Afiliado - Seleccionado */
                                    <>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Cantidad: ' + quantity}</Typography>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Total: $'+ formatPrice(bread.precioNoAfiliado*quantity)}</Typography>
                                    </>
                                :
                                    <>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Cantidad: ' + quantity}</Typography>
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'Total: $'+ formatPrice(0.10*quantity)}</Typography>
                                    </>
                        :
                            isAffiliated ? /* Afiliado - No Seleccionado */
                                bread.precioAfiliado != null ?
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'$ ' + formatPrice(bread.precioAfiliado) + 'c/u'}</Typography>
                                :
                                    <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'$ ' + formatPrice(0.10) + 'c/u'}</Typography>
                            :
                                bread.precioNoAfiliado != null ? /* No Afiliado - No Seleccionado */
                                <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'$ ' + formatPrice(bread.precioNoAfiliado) + 'c/u'}</Typography>
                                :
                                <Typography  variant="body2" component="div" color="text.secondary" sx={{fontSize:'1rem'}}>{'$ ' + formatPrice(0.10) + 'c/u'}</Typography>     
                        }  
                </CardContent>
            </Card>
</div>
}
