import React, { PureComponent } from 'react';
import { Sector, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Container } from '@mui/material';
import { useState } from 'react'

const Graph  = () =>  {
    
const data = [
    {
        name: 'December',
        Customers: 5,
        Savings_in_hundreeds: 5,
        amt: 2100,
    },
    {
      name: 'January',
      Customers: 15,
      Savings_in_hundreeds: 12,
      amt: 2400,
    },
    {
      name: 'February',
      Customers: 109,
      Savings_in_hundreeds: 90,
      amt: 2210,
    },
    {
      name: 'March',
      Customers: 308,
      Savings_in_hundreeds: 280,
      amt: 2290,
    },
    {
      name: 'April',
      Customers: 409,
      Savings_in_hundreeds: 270,
      amt: 2000,
    },
    {
      name: 'May',
      Customers: 807,
      Savings_in_hundreeds: 690,
      amt: 2181,
    },
    {
      name: 'June',
      Customers: 1023,
      Savings_in_hundreeds: 1000,
      amt: 2500,
    },
   
  ];
    
  const data2 = [
    {
        name: 'December',
        machines: 1,
        income_in_thousands: 1.5
    },
    {
      name: 'January',
      machines: 2,
      income_in_thousands: 2,
    },
    {
      name: 'February',
      machines: 3,
      income_in_thousands: 3
    },
    {
      name: 'March',
      machines: 4,
      income_in_thousands: 3.5,
    },
    {
      name: 'April',
      machines: 6,
      income_in_thousands: 6,
    },
    {
      name: 'May',
      machines: 7,
      income_in_thousands: 6.5,
    },
    {
      name: 'June',
      machines: 8,
      income_in_thousands: 7,
    },
   
  ];

  const [dataa33, setdata33] = useState([]);
  // React.useEffect(() => {
  //   axios.get('https://dvm-dq1y.onrender.com/build/getprofit').then(res => {
  //       console.log(res.data)
  //       setitems(res.data.feedbacks)

  //   }).catch(err => {
  //       console.log(err)
  //   })
  // }, [])

  const data3 = [
    { name: 'Zefmesh', value: 6000 },
    { name: 'Edna mall', value: 1500 },
    { name: 'others', value: 500},
  ];
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{` ${value} $`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };

 
  const [activeIndex1, setactive] = useState(0)
  const color = ['green',"#8884d8",'blue']

  function onPieEnter (_, index){
    // console.log(index, _)
    setactive(index);
  };

    return (
        <div>
        <Container sx={{ mx:30}}>
        <h2> Customer and Total savings grpah for the past 7 months</h2>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Customers" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Savings_in_hundreeds" stroke="#82ca9d" />
        </LineChart>
        </Container>
       
       <br/>
       <br/>
       <br/>
        <Container sx={{ mx:3}}>
        <h2> Number of machines and  total income for the past 7 months</h2>
        <LineChart
          width={500}
          height={300}
          data={data2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="machines" stroke="red" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="income_in_thousands" stroke="#82ca9d" />
        </LineChart>
        </Container>

        
        <Container sx={{ mx:70}}>
          <h2> Income of buildings </h2>
        <PieChart width={340} height={340}>
          <Pie
            activeIndex={activeIndex1}
            activeShape={renderActiveShape}
            data={data3}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill={color[activeIndex1]}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
        </Container>
        </div>
    );

}
export default Graph;