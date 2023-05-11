
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { redirect, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';




const Machine = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [data, setdata] = useState([]);

  React.useEffect(() => {
    axios.get('https://dvm-dq1y.onrender.com/vmachine/getall' )
    .then(res => {


    
        res.data.machines.map((item)=> {
            if (item.name == name) {
               setdata(item.items)
              
            }
        })

    }).catch(err => {
        console.log(err)
    })

  }, [])

  function redirect (name){
    navigate(`/home/edititem/${name}`);
  }

  return (
    <Container>
    <TableContainer sx={{ mx:10, my: 10, maxWidth: 1000 }} component={Paper}>
      <Table sx={{ minwidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ color:'green' }}> <h2> Item </h2></TableCell>
            <TableCell align="center" sx={{ color:'green' }}><h2> Stock </h2></TableCell>
            <TableCell align="center" sx={{ color:'green' }}> <h2> Price </h2> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       
         {Object.keys(data).map((key) => 
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row" align="center">
                {key}
            </TableCell>
            <TableCell align="center">{data[key]['stock']}</TableCell>
            <TableCell align="center">{data[key]['price']}</TableCell>
            </TableRow>
         )}

        </TableBody>
      </Table>
    </TableContainer>
      < Button variant="contained" style={{ backgroundColor:'red'}}  sx={{mx: 65}} onClick = {  
        (e) => {  
          redirect(name)
        }
    } > Edit </Button>
    </Container>
    

  );
};
export default Machine;