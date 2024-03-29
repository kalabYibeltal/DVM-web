import React from 'react';
import {Box,  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';
import {useLocation, useNavigate} from "react-router-dom";
import {Outlet} from "react-router";
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import Homeback from '../Background/landingback';



function Home() {
    const navigate = useNavigate();
    const logout = () => {
        navigate("/appbar/login");
      }
    const location = useLocation()
    const drawerWidth = 240
    const NavBarItems = [
        {
            text: "Machines",
            path: "machines"
        },
        {
            text: "Add Machine",
            icon: <AddIcon  />,
            path: "addmachine"
        },
        {
            text: "Stats",
            path: "miscellaneous"
        },
        {
            text: "Feedback",
            path: "feedback"
        },
    ]


    return (
        <>
           {/* <Home back /> */}
            <Drawer
                PaperProps={{
                    sx: {
                    backgroundColor: "#D3D3D3",
                    color: "black",
                    fontWeight: 'bold'
                    }
                }}    
                variant="permanent"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                  
                }}
              >
                <Toolbar />
                <Box sx={{ overflow: 'auto'}} >
                  <List>
                    {NavBarItems.map((item, index) => (
                        <ListItem
                            key={item.text}
                            selected={location.pathname === `/appbar/home/${item.path}`}
                            disablePadding
                            
                        >
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                            >
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon >
                               <ListItemText primary={item.text} /> 
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <Button endIcon={<LogoutIcon />} variant={'text'} color={'inherit'} sx={{color: "red", fontSize: 12, mx:9 }} onClick={logout}>Logout</Button>
                 
                  </List>
                </Box>
          </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </>
    );
}

export default Home;