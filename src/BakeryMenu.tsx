import { BreadCard } from './BreadCard';
import React,  { useEffect, useState } from 'react';
import { Dialog, Toolbar, AppBar, Button, Grid, Tab, Box}  from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import QuantityModal from './QuantityModal';



interface Bread {
    disponible: string;
    codigoItem: string;
    nombre: string;
    url: string;
    precioAfiliado?: number;
    precioNoAfiliado?: number;
    isSelected: boolean;
}

interface Category {
    codigo: number;
    descripcion : string;
    items : Bread[];
}

interface CartItem{
    bread: Bread;
    quantity : number;
}

interface BakeryMenuProps {
    previousItems: CartItem[],
    isOpen: boolean;
    isAffiliated : boolean;
    onClose: () => void;
    setCart: (items : CartItem[])=> void;
}


const BakeryMenu: React.FC<BakeryMenuProps> = ({ previousItems, isOpen, onClose, setCart, isAffiliated }) => {
    
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
        const updatedData = dataCatalogoPan.map((category) => ({
            ...category,
            items: category.items.map((item) => 
                item.codigoItem === bread.codigoItem
                    ? { ...item, isSelected: true }
                    : item
            ),
        }));
        setDataCatalogoPan(updatedData);
        setCartItems((prevCartItems) => [...prevCartItems, { bread, quantity }]);
        handleModalClose();
    };
    
    const handleBakeryClose = () => {
        var unifiedCart = cartItems
        for (var item of previousItems) {unifiedCart.push(item)}
        setCart(unifiedCart)

        // Limpiar seleccion para cada apertura de Menu Bakery
        const resetSelection = dataCatalogoPan.map((category) => ({
            ...category,
            items: category.items.map((item) => ({
                ...item,
                isSelected: false,
            })),
        }));
        setDataCatalogoPan(resetSelection);

        setCartItems([])
        onClose()
    }

    // Fetch Servicio para tener Catalogo
    const [dataCatalogoPan, setDataCatalogoPan] = useState<Category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
            // API de TEST
            //const response = await fetch('https://ec11055f-9910-4d14-a8ed-66882912848b.mock.pstmn.io/todos', {
            const response = await fetch('http://10.80.4.172:8081/scopay/webresources/catalogoPan', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ idLocal: '110' })
            });
    
            if (response.ok) {
                const responseData = await response.json()
                
                const responseDataWithInterfaceBread =  responseData.data.map((category: Category) => ({
                    codigo: category.codigo,
                    descripcion : category.descripcion,
                    items: category.items.map((item: Bread) => ({
                        ...item,
                        isSelected: false,
                    }))
                }))
                setDataCatalogoPan(responseDataWithInterfaceBread);
            } else {
                console.error('Error en la solicitud:', response.status);
            }
            } catch (error) {
            console.error('Error:', error);
            }
        };
        
    
        fetchData();

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
                                    <TabList value={category} onChange={handleCategoryChange} variant="scrollable" scrollButtons='auto'>
                                    {dataCatalogoPan.map((categoryData: Category) => {
                                    const hasEnabledBread = categoryData.items.some((bread) => bread.disponible != 'false' ? true : false);
                                    console.log(categoryData)
                                    console.log("cat: " + categoryData.descripcion + " dispo: " + hasEnabledBread)
                                    return hasEnabledBread ? (
                                        <Tab label={categoryData.descripcion} key={categoryData.codigo} />
                                    ) : null;
                                    })}
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
                                    overflow:'hidden'
                                    }}
                                >
                                    <Grid container>
                                    {categoryData.items.map((item: any) => ( item.disponible == "false" ? null : (
                                        <Grid item xs={1.5}>
                                            <BreadCard bread={item} isSelected={item.isSelected} onClick={handleCardClick} quantity={
                                                                                                                                        cartItems.reduce((accumulator, cartItem) => {
                                                                                                                                        if (cartItem.bread.codigoItem === item.codigoItem) {
                                                                                                                                            return accumulator + (cartItem.quantity ?? 0);
                                                                                                                                        }
                                                                                                                                        return accumulator;
                                                                                                                                        }, 0) || 1
                                                                                                                                    } isAffiliated={isAffiliated}/>
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
            <QuantityModal item={selectedItem} open={modalOpen} onClose={handleModalClose} onConfirm={handleModalConfirm} />
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