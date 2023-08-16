import React,  { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Dialog, Toolbar, IconButton, AppBar, Button, Typography, DialogContent, Grid, Tabs, Tab, Box }  from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

interface BakeryMenuProps {
    isOpen: boolean;
    onClose: () => void;
}


const BakeryMenu: React.FC<BakeryMenuProps> = ({ isOpen, onClose }) => {
    
    const [category, setCategory] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setCategory(newValue);
    };

    if (!isOpen) {
        return null;
    }

    const styleModal = {width: "100%", height:'100%',  backgroundImage: `url(${"https://upload.wikimedia.org/wikipedia/commons/7/7b/Assorted_bread.jpg"})`, backgroundRepeat:'no-repeat',  backgroundSize: 'cover', backgroundPosition: 'center' };
    

    return (
            <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullScreen
            //sx={{top:65}}
            >
                <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={category}>
                    <AppBar sx={{ position: 'relative', backgroundColor:'#ffffff' }}>
                        <Toolbar>
                            <Box sx={{ maxWidth: { xs: 500, sm: 700 }, bgcolor: 'background.paper' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example"
                                variant="scrollable"
                                scrollButtons="auto"
                                >
                                    <Tab label="Item One" />
                                    <Tab label="Item Two" />
                                    <Tab label="Item Three" />
                                    <Tab label="Item Four" />
                                    <Tab label="Item Five" />
                                    <Tab label="Item Six" />
                                    <Tab label="Item Seven" />
                                    <Tab label="Item Seven" />
                                    <Tab label="Item Seven" />
                                    <Tab label="Item Seven" />
                                    <Tab label="Item Seven" />
                                    <Tab label="Item Seven" />
                                    <Tab label="Item Seven" />

                                </TabList>
                            </Box>
                                <Button autoFocus color="info" onClick={onClose} style={{ position: 'absolute', top: '20%', right: '0%'}}>
                                Volver al Carrito
                                </Button>
                        </Toolbar>
                    </AppBar>

                        <TabPanel value='1'>
                            dsfhdskjflkdsjf
                        </TabPanel>
                    
                        <TabPanel value='2' >
                            fsdfsdfsdfdsdfsd
                        </TabPanel>

                    <div
                        className="d-flex flex-column align-items-center"
                        style={{width: "100%", height:'100%',  backgroundImage: `url(${"https://scottishbusinesscentre.com/wp-content/uploads/2023/03/36861227-50C7-44BA-A350-212E56ABBF0F.jpeg"})`, backgroundRepeat:'no-repeat',  backgroundSize: 'cover', backgroundPosition: 'center', /*filter: 'blur(8px)'*/  }}
                    >

                        {/* //TABS DINAMICOS DE LA CATEGORIAS DE PANES */}
                        


                    </div>
                
                </TabContext>  
                </Box>   
            </Dialog>
      );

}

export default BakeryMenu;
