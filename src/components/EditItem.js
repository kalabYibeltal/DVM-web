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
import Homeback from '../Background/landingback';




export default function EditItem() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data1, setdata1] = useState("")
  const [data2, setdata2] = useState("")
  const [data3, setdata3] = useState("")

//   const [data, setdata] = useState(["","","",""])

    console.log("In Edit: ", name)

    function handler() {
         
        // setdata([data1,data2,data3,name])
        console.log(data1)
        console.log(data3)
        console.log(data2)
        // const [data, setdata] = useState([data1,data2,data3,name])
        axios.post('https://dvm-dq1y.onrender.com/vmachine/edititem', {"message":[data1,data2,data3,name]})
        .then(result => {
            console.log(result.data)
            return result.data;
        }).catch((err) => {
            console.log(err);
        })

        navigate(`/appbar/home/machines`)
    }
    return (
    <Box component="form" onSubmit={handler} > 
    <Grid item xs={12} sm={6} sx ={{mx:30}} >
        <Box sx={{mx:30, color:'green' }}> <h1  > Edit Item </h1> </Box>

        <TextField
            required
            fullWidth
            id="name"
            label="item name"
            name="name"
            value={data1}
            sx={{my: 1}}
            onChange={(e) => {
                setdata1(e.target.value)
                console.log(data1)
            }}

        />
        <TextField
            required
            fullWidth
            id="stock"
            label="item amount"
            name= "stock"
            value={data2}
            sx={{my: 1}}
            onChange={(e) => {
                setdata2(e.target.value)
                console.log(data2)
            }}
    
        />
        <TextField
            required
            fullWidth
            id="price"
            label="item price"
            name="price" 
            value={data3}
            sx={{my: 1}}
            onChange={(e) => {
                setdata3(e.target.value)
                console.log(data3)
                console.log(data1)
            }}
            
        />
        <Divider />
</Grid>

    <center>
    <Button
       type="submit"
        variant="contained"
        color={"primary"}
        sx={{ mx:5,  backgroundColor:"green"}}       
    
    >
        submit
    </Button>
    </center >
</Box>
  );
};