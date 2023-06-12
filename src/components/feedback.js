import React from 'react';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useState } from 'react';
import axios from 'axios';
// import Div from '@mui/material/Div';
import Homeback from '../Background/landingback';

const Feedback = () => {

    const [items, setitems] = useState([]);
    const [average, setaverage] = useState([]);
  
    React.useEffect(() => {
      axios.get('https://dvm-dq1y.onrender.com/feedback/getall').then(res => {
          console.log(res.data)
          setitems(res.data.feedbacks)
  
      }).catch(err => {
          console.log(err)
      })
      axios.get('https://dvm-dq1y.onrender.com/feedback/getaverage').then(res => {
          setaverage(res.data)
          console.log(res.data)
      }).catch(err => {
          console.log(err)
      })
  
    }, [])


  return (
   
    <div>
      <h1>Customers' Feedback</h1>
      
      <Card sx ={{my:5, mx:10, backgroundColor: '#ADD8E6'}}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' sx={{color: "Green"}}>Average Rating:</Typography>
          <Typography style={{ marginLeft: '0.5rem' }}>{average.average}</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6' sx={{color: "Green"}}>Feedback Summary:</Typography>
          <Typography style={{ marginLeft: '0.5rem' }}>{average.feedbacks}.</Typography>
        </div>
        </Card>

      {items.map((item, index) => (
        <Card sx ={{my:5, mx:10}}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6'>Rating:</Typography>
          <Typography style={{ marginLeft: '0.5rem', color:'red' }}>{item['rating']}</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='h6'>Feedback:</Typography>
          <Typography style={{ marginLeft: '0.5rem' }}>{item['feedback']}</Typography> 
        </div>
        </Card>
        
     
     ))}
    </div>

  );
};

export default Feedback;