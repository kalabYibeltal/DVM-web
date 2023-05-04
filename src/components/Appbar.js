import {AppBar, Box,  CssBaseline, Toolbar, Typography} from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router';


export default function Appbar() {
   

  return (
       
        <Box  sx={{ display: 'flex',
           }} >
          <CssBaseline />
          <AppBar position='fixed'
                  sx={{ zIndex: (theme) => theme.zIndex.drawer + 3,
                    backgroundColor: '#505153'  }}
          >
             
              <Toolbar sx={{m: "auto", width: "100%" }}>

                  <Typography
                    variant='h4'
                    align='left'
                    sx={{
                        flexGrow: 0,
                        m: 2,
                        mx: 56,
                    }}
                  >
                      Digital Vending Machine Admin Page
                  </Typography>
                 

              </Toolbar>
            
          </AppBar>
          <Outlet />
      </Box>
   
  
      
      
  )
}
