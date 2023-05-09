import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useForm from "../hooks/useForm";
import {useNavigate} from "react-router-dom";

import { Divider } from 'antd';

import axios from 'axios';
import { useState } from 'react'

const getFreshModel = () => ({
	name: "",
	numberofitems: "",
    building: "",
	items: [],
    city: "",
})


export default function AddMachine() {
	const sample = {"name": "", "price": "", "stock": ""};
	const navigate = useNavigate();
	const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

	const [Status, setStatus] = useState("")
	const [StatusColor, setStatusColor] = useState("green")


  const handleSubmit = (event) => {
    event.preventDefault();
	

	if (validate()) {
		const data = {
			name: values.name,
			items: values.items,
			numberofitems: values.numberofitems,
			building: values.building,
			city: values.city,
			
		};
		console.log(values, values.items)
		axios.post('https://dvm.onrender.com/vmachine/createmachine_post', values)
                .then(result => {
					setStatus("Vending machine added")
					setStatusColor('green')
                    return result.data;
                }).catch((err) => {
					setStatus("Error, try again")
					setStatusColor('red')
					console.log(err);
				})
	}

  };

  function addItem() {
	setValues({
		...values,
		numberofitems: values.numberofitems + 1,
		items: values.items + [{"name": "", "price": "", "stock": ""}]
		
	})
  }

  const validate = () => {
	  let temp = {};
	  temp.name = values.name ? "" : "Please Enter Machine Name.";
	  temp.numberofitems = values.numberofitems ? "" : "Please state number of items.";
	  temp.items = values.items ? "" : "Please Enter Customer Name.";
	  temp.building = values.building ? "" : "Please Enter building name";
	  temp.city = values.city ? "" : "Please enter name of City.";
	  setErrors(temp)
	  return Object.values(temp).every(x => x === "");
	}

  return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column', 	
            alignItems: 'center',
          }}
        >  

		   <Typography sx={{color: StatusColor}} component="h3" variant="h3" >
            {Status}
          </Typography>
          <Typography component="h1" variant="h5">
            Add a Machine
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField
						autoComplete="name"
						name="name"
						required
						fullWidth
						id="name"
						label="name"
						value={values.name}
						onChange={handleInputChange}
						{...(errors.name && {error:true, helperText:errors.name})}
                />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						autoComplete="building"
						name="building"
						required
						fullWidth
						id="building"
						label="building"
						value={values.building}
						onChange={handleInputChange}
						{...(errors.building && {error:true, helperText:errors.building})}
                />
				</Grid>
				<Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="city"
				  value={values.city}
				  onChange={handleInputChange}
				  {...(errors.city && {error:true, helperText:errors.city})}
                />
              </Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						id="number of items"
						label="number of items"
						name="numberofitems"
						autoComplete="number of items"
						value={values.numberofitems}
						onChange={(e) => {
							setValues({
								...values,
								numberofitems: e.target.value,
								items: Array(Number(e.target.value)).fill().map(u => ({"name": "", "price": "", "stock": ""}))
							})
						}}
						{...(errors.numberofitems && {error:true, helperText:errors.numberofitems})}
					/>
              </Grid>
              <Divider/>
		
						

		  	{Number(values.numberofitems) > 0 && Array(Number(values.numberofitems)).fill("_")
				.map((item, index) => {
					console.log(index);
					// values.items[index].name = "kalab";
					console.log(values.items);

					return (
					<Grid item xs={12} sm={6} sx ={{mx:36}} key={index}>
						<h1 sx={{ textalign: 'center', mx: 15}} > Item {index + 1}</h1>
						<TextField
							required
							fullWidth
							id={"name" + index}
							label="item name"
							name={"name" + index}
							value={values.items[index].name}
							onChange={(e) => {
								let tmp = values.items
								tmp[index].name = e.target.value
								setValues({
									...values,
									items: tmp
								})
								
							}}
			
						/>
						<TextField
							required
							fullWidth
							id={"price" + index}
							label="item price"
							name= {"price" + index}
							value={values.items[index].price}
							onChange={(e) => {
								let tmp = values.items
								tmp[index].price = e.target.value
								setValues({
									...values,
									items: tmp
								})
					
							}}
					
						/>
						<TextField
							required
							fullWidth
							id={"stock" + index} 
							label="item amount"
							name={"stock" + index} 
							value={values.items[index].stock}
							onChange={(e) => {
								let tmp = [...values.items]
								console.log(index)
								console.log(e.target.name)
								tmp[index].stock = e.target.value
								console.log(tmp)
								console.log(e.target.value)
								setValues({
									...values,
									items: tmp
								})
							
							}}
							
						/>
						<Divider />
				</Grid>
				)
				})
			}
			  
            </Grid>
			
			<center> 
			{/* < Button variant="outlined" sx={{  my: 3, color:'grey'}}   
			onClick = {(e) => {  
				addItem()
				}
			} > Add Item </Button> */}

			<Button
              type="submit"
              variant="contained"
			  color={"primary"}
              sx={{ mx:5,  backgroundColor:"green"}}
            >
              submit
            </Button>
			
			</center>

          </Box>
        </Box>
  );
}
