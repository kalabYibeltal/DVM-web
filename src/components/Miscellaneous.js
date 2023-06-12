import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Row } from 'antd';
import {  Col } from 'antd';
import Graph from './Graph.js';

export default function Miscellaneous() {
	const [customers, setcustomers] = React.useState(0)
	const [customersbalance, setcustomersbalance] = React.useState(0)
	const [machines, setmachines] = React.useState(0)
	const [income, setincome] = React.useState(0)
	

	React.useEffect(() => {
		axios.get('https://dvm-dq1y.onrender.com/admin/userdata')
                .then(result => {
					setcustomers(result.data.customers)
					setcustomersbalance(result.data.customersbalance)
        
                }).catch(function (err) {
					console.log(err)
                  }
                
                )
		axios.get('https://dvm-dq1y.onrender.com/admin/machinedata')
		.then(result => {
			setmachines(result.data.machines)
			setincome(result.data.income)

		}).catch(function (err) {
			console.log(err)
			}
		
		)
	}, [])

	

	return (
		<Col>
		<Row>
		<Card sx={{ maxWidth: 345, mx:7, my:9, backgroundColor:'rgb(234, 234, 234)'}}>
		<CardContent>
		  <Typography gutterBottom variant="h5" component="div" color={"blue"}>
			Number of registerd customers : {customers}
		  </Typography>
		</CardContent>
		<CardContent>
		  <Typography gutterBottom variant="h5" component="div"  color={"green"}>
			Total customers savings : {customersbalance} br
		  </Typography>
		</CardContent>
	  </Card>

	  <Card sx={{ maxWidth: 345, my:9, backgroundColor:'rgb(234, 234, 234)'}}>
		<CardContent>
		  <Typography gutterBottom variant="h5" component="div" color={"green"}>
			Number of working machines :   {machines}
		  </Typography>
		</CardContent>
		<CardContent>
		  <Typography gutterBottom variant="h5" component="div" color={"blue"}>
			Total income generated : {income} br
		  </Typography>
		</CardContent>
	  </Card>

	</Row>
	<Row>
		<Graph />
	</Row>
	</Col>
  )
}
