import React,  { useEffect, useState } from 'react';
import { Dialog, Toolbar, AppBar, Button, Typography, DialogContent, Grid, Tabs, Tab, Box, Card, CardMedia, CardContent }  from '@mui/material';
import { TabContext, TabList } from '@mui/lab';

interface BakeryMenuProps {
    isOpen: boolean;
    onClose: () => void;
}


const BakeryMenu: React.FC<BakeryMenuProps> = ({ isOpen, onClose }) => {
    
    const [category, setCategory] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCategory(newValue);
    };

    const [dataCatalogoPan, setDataCatalogoPan] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
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
      }, []);

    if (!isOpen) {
        return null;
    }

    return (
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
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems:'center', overflow:'hidden'}}>

                    <AppBar sx={{ position: 'relative', backgroundColor:'#ffffff' }}>
                        <Toolbar>
                            <Box sx={{ maxWidth: 1100, bgcolor: 'background.paper' }}>
                                <TabList value={category} onChange={handleChange} aria-label="lab API tabs example"
                                variant="scrollable"
                                scrollButtons="auto"
                                >
                                    {dataCatalogoPan.map((categoryData: any) => ( 
                                        <Tab label={categoryData.descripcion} />

                                    ))}
                                </TabList>
                            </Box>
                                <Button autoFocus color="info" onClick={onClose} style={{ position: 'absolute', top: '20%', right: '0%'}}>
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
                                width: '95vw',
                                height: '82vh', 
                                backgroundColor: 'rgba(255, 255, 255, 0.85)', 
                                borderRadius: '20px', 
                                padding: '20px', 
                                margin: '18px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                                display: category === (categoryData.codigo-1) ? 'flex' : 'none', 
                                flexDirection:'row',
                                
                                flexWrap:'wrap',
                                overflow:'auto',
                                justifyContent: 'space-around'
                            }}
                            >
                            
                                {categoryData.items.map((item: any) => ( item.disponible == "false" ? null : (
                                    <Card 
                                        key={item.codigoItem} 
                                        sx={{
                                            marginBottom: '10px',
                                            height: '40vh',
                                            width: '15vw',
                                            margin: '10px',
                                        }}>
                                        
                                        <CardMedia
                                            component="img"
                                            alt={correctFormat(item.nombre)}
                                            height="140"
                                            image={item.url.replace('linuxlocal', '10.80.4.172')}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                {correctFormat(item.nombre)}
                                            </Typography>
                                            {/* Otros detalles del ítem */}
                                        </CardContent>
                                    </Card>
                                )
                                ))}
                            </Box>
                            
                            </TabPanel>
                        ))}

                    </Box>

                    </Box>
                </TabContext>    
            </Dialog>
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

function correctString(jsonString: string): string {
    // Parse the JSON string to an object
    let jsonObject;
    try {
        jsonObject = JSON.parse(jsonString);
    } catch (error) {
        console.error("Invalid JSON input:", error);
        return jsonString; // Return the original string if JSON parsing fails
    }
    
    // Iterate through the object's properties and correct the values
    for (const key in jsonObject) {
        if (typeof jsonObject[key] === "string") {
            jsonObject[key] = correctFormat(jsonObject[key]);
        }
    }
    
    // Convert the corrected object back to JSON and return
    return JSON.stringify(jsonObject);
}

function correctFormat(input: string): string {
    // Replace special characters and capitalize words
    const corrected = input
        .replace(/[^A-Za-záéíóúüÁÉÍÓÚÜñÑ\s]/g, "") // Remove non-alphabetic characters except spaces
        .replace(/\w+/g, (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()); // Capitalize words
    
    return corrected;
}

export default BakeryMenu;
