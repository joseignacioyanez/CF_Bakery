import { BreadCard } from './BreadCard';
import React,  { useEffect, useState } from 'react';
import { Dialog, Toolbar, AppBar, Button, Grid, Tabs, Tab, Box, Card, CardMedia, CardContent }  from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import QuantityModal from './QuantityModal';

interface Bread {
    disponible: boolean;
    codigo: string;
    nombre: string;
    url: string;
    precioAfiliado?: number;
    precioNoAfiliado?: number;
}

interface CartItem{
    bread: Bread;
    quantity : number;
}

interface BakeryMenuProps {
    items: CartItem[],
    isOpen: boolean;
    onClose: () => void;
    setCart: (items : CartItem[])=> void;
}


const BakeryMenu: React.FC<BakeryMenuProps> = ({ items, isOpen, onClose, setCart }) => {
    
    const [category, setCategory] = useState(0);
    const [selectedItem, setSelectedItem] = useState<Bread | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleCategoryChange = (event: React.SyntheticEvent, newValue: number) => {
        setCategory(newValue);
    };

    const handleCardClick = (bread: Bread) => {
        setSelectedItem(bread);
        setModalOpen(true);
      };
    
      const handleModalClose = () => {
        setSelectedItem(null);
        setModalOpen(false);
      };
    
      const handleModalConfirm = (bread: Bread, quantity: number) => {
        console.log("CartAntes:", cartItems)
        setCartItems((prevCartItems) => [...prevCartItems, { bread, quantity }]);
        console.log("CartDespues:", cartItems)
        handleModalClose();
      };
      
      const handleBakeryClose = () => {
            setCart(cartItems)
            onClose()
      }

    // Fetch Servicio para tener Catalogo
    const [dataCatalogoPan, setDataCatalogoPan] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
            // API de TEST
            //const response = await fetch('https://catalogopan.free.beeceptor.com/todos', {
            const response = await fetch('http://10.80.4.172:8081/scopay/webresources/catalogoPan', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ idLocal: '110' })
            });
    
            if (response.ok) {
                const responseData = await response.json();
                setDataCatalogoPan(responseData.data);
            } else {
                console.error('Error en la solicitud:', response.status);
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };
        
    
        fetchData();

        // Limpiar carro
        setCartItems([])
    }, []);

    // Para que se dispare con el boton de App.tsx
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen
            PaperProps={{
                sx: {
                    width: "100vw", 
                    height:'100vh', 
                    backgroundImage: `url(${"https://scottishbusinesscentre.com/wp-content/uploads/2023/03/36861227-50C7-44BA-A350-212E56ABBF0F.jpeg"})`, 
                    backgroundRepeat:'no-repeat',  
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    overflow:'hidden'
                },
            }}
            >
                
                
                <TabContext value={category.toString()} >
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:'center', overflow:'hidden'}}>

                        <AppBar sx={{ position: 'relative', backgroundColor:'#ffffff' }}>
                            <Toolbar>
                                <Box sx={{ width: '70vw' }}>
                                    <TabList value={category} onChange={handleCategoryChange}
                                    variant="scrollable"
                                    scrollButtons='auto'
                                    >
                                        {dataCatalogoPan.map((categoryData: any) => ( 
                                            <Tab label={categoryData.descripcion} />

                                        ))}
                                    </TabList>
                                </Box>
                                    <Button autoFocus color="info" onClick={handleBakeryClose} style={{ position: 'absolute', top: '20%', right: '0%'}}>
                                    Volver al Carrito
                                    </Button>
                            </Toolbar>
                        </AppBar>

                        <Box 
                        sx={{ 
                            
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            top: '8vh',
                            height:'92vh',
                            marginBottom: '3vh',
                            overflow: 'hidden'
                        }}>
                        
                                {dataCatalogoPan.map((categoryData: any) => ( 
                                <TabPanel value={category} index={categoryData.codigo-1} >
                                <Box 
                                    className = 'container'
                                    sx={{ 
                                    typography: 'body1', 
                                    width: '100vw',
                                    height: '90vh', 
                                    backgroundColor: 'rgba(230, 230, 230, 1)', 
                                    borderRadius: '20px', 
                                    padding: '10px', 
                                    margin: '10px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                                    display: category === (categoryData.codigo-1) ? 'flex' : 'none', 
                                    overflow:'auto',
                                    justifyContent: 'space-around'
                                }}
                                >
                                    <Grid container>
                                    {categoryData.items.map((item: any) => ( item.disponible == "false" ? null : (
                                        <Grid item xs={2.4}>
                                            <BreadCard bread={item} onClick={handleCardClick} />
                                        </Grid>
                                    )
                                    ))}
                                    </Grid>
                                </Box>
                                
                                </TabPanel>
                            ))}

                        </Box>

                    </Box>
                </TabContext>    
                
            </Dialog>
            <QuantityModal
                item={selectedItem}
                open={modalOpen}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
             />
        </>                                
        );

}

function TabPanel(props: { children: any; value: number; index: number; })
{
    const {children, value, index}=props;
    return(
        <div>
            {
                value===index && (
                    <div>{children}</div>
                )
            }
        </div>
    )
}

export default BakeryMenu;