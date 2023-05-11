import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useForm from "../hooks/useForm";
import {useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';
import  Container  from '@mui/material/Container';

import axios from 'axios';
import { useState } from 'react'




export default function EditItem() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data, setdata] = useState(["","","",name])
    console.log("In Edit: ", name)

    function handler() {
        console.log('sadf');
        axios.post('https://dvm-dq1y.onrender.com/vmachine/edititem', {message:data})
        .then(result => {
            return result.data;
        }).catch((err) => {
            console.log(err);
        })

        navigate(`/home/machine/${name}`)
    }
    return (
    <Container>
    <Grid item xs={12} sm={6} sx ={{mx:30}} >
        <Box sx={{mx:30, color:'green' }}> <h1  > Edit Item </h1> </Box>

        <TextField
            required
            fullWidth
            id={"name"}
            label="item name"
            name={"name"}
            value={data[0]}
            
        />
        <TextField
            required
            fullWidth
            id={"price" }
            label="item price"
            name= {"price"}
            value={data[1]}
        
    
        />
        <TextField
            required
            fullWidth
            id="stock"
            label="item amount"
            name="stock" 
            value={data[2]}
        
            
        />
        <Divider />
</Grid>

    <center>
    <Button
        variant="contained"
        color={"primary"}
        sx={{ mx:5,  backgroundColor:"green"}}
        onClick = {  
            (e) => {  
                handler()
            }
        } 
           
    
    >
        submit
    </Button>
    </center >
</Container>

  );
};