import { Space, Table } from 'antd';
import {Button} from 'antd';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { QRCode, Popover } from 'antd';
import  { DownloadOutlined, RiseOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Homeback from '../Background/landingback';
import Papa from 'papaparse';

const Machines = () => {
  const navigate = useNavigate()
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [data, setdata] = useState([])

  React.useEffect(() => {

    axios.get('https://dvm-dq1y.onrender.com/vmachine/getall').then(res => {

        // console.log(res.data.machines)
        setdata(res.data.machines)

    }).catch(err => {
        console.log(err)
    })

  }, [])

function downloadCsv(){
    console.log(data)

    const formattedData = data.map(machine => ({
      Name: machine.name,
      NumberOfItems: machine.numberofitems,
      Building: machine.building,
      City: machine.city,
      Income: machine.income,
    }));

    // Convert the formatted data to CSV
    const csv = Papa.unparse(formattedData);

    // Save as CSV file
    const csvBlob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvLink = document.createElement('a');
    if (csvLink.download !== undefined) {
      const csvUrl = URL.createObjectURL(csvBlob);
      csvLink.setAttribute('href', csvUrl);
      csvLink.setAttribute('download', 'data.csv');
      csvLink.style.visibility = 'hidden';
      document.body.appendChild(csvLink);
      csvLink.click();
      document.body.removeChild(csvLink);
    }
}





  const getRowClassName = (record, index) => {
    let count = true // no empty item
    Object.keys(record.items).map((key) => {
      count = count && record.items[key].stock != 0 // already efficient
    })
    
    return count ? '' : 'highlight-row';
  };


  function downloadQRCode() {
		const canvas = document.getElementById('qrcode')?.querySelector('canvas');
    console.log(canvas)
		if (canvas) {
      console.log(1)
			const url = canvas.toDataURL();
			const a = document.createElement('a');
			a.download = 'QRCode.png';
			a.href = url;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	}

  function redirect (res1,res2){
    navigate(`/appbar/home/machine/${res1},${res2}`);
  }
 
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setIncomeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'income',
    });
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      filters: [
        {
          text: 'Addis Ababa',
          value: 'addis ababa',
        },
        {
          text: 'helsinki',
          value: 'helsinki',
        },
      ],
      filteredValue: filteredInfo.city || null,
      onFilter: (value, record) => record.city.includes(value),
      sorter: (a, b) => a.city.length - b.city.length,
      sortOrder: sortedInfo.columnKey === 'city' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Building',
      dataIndex: 'building',
      key: 'building',
      filters: [
        {
          text: 'Edna Mall',
          value: 'edna mall',
        },
        {
          text: 'Zefmesh',
          value: 'zefmesh',

        },
      ],
      filteredValue: filteredInfo.building || null,
      onFilter: (value, record) => record.building.includes(value),
      sorter: (a, b) => a.building.length - b.building.length,
      sortOrder: sortedInfo.columnKey === 'building' ? sortedInfo.order : null,
      ellipsis: true,
      
    },
    {
      title: 'Income',
      dataIndex: 'income',
      key: 'income',
      sorter: (a, b) => a.income - b.income,
      sortOrder: sortedInfo.columnKey === 'income' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Number of Items',
      dataIndex: 'numberofitems',
      key: 'numberofitems',
      sorter: (a, b) => a.numberofitems - b.numberofitems,
      sortOrder: sortedInfo.columnKey === 'numberofitems' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Download QR Code',
      dataIndex: 'qrcode',
      key: 'qrcode',
      backgroundColor: "green",
      fixed: 'right',
     
      render: (text, record, index) => < div className = "btn-wrap "
      style = {
        {
          width: "200px"
        }
      } > 
      
      <div id={"qrcode"}>
        
      <QRCode value={record.name} bordered={false}/>
			</div>
      < Button style={{ color:'green'}} icon={<DownloadOutlined />} onClick = {  

          (e) => {  
            downloadQRCode()
          }

      } > Download  </Button>

      </div >
     
    },

    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      backgroundColor: "green",
      fixed: 'right',
     
      render: (text, record, index) =>
       < Button style={{ color:'red'}}  onClick = { (e) => {  
            redirect(record.name,record.building)
          } } > Get details <RiseOutlined /></Button>
     
    },

  ];
  return (
    <>
      <Homeback />  
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setIncomeSort}>Sort Income</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
        <Button style={{color:"blue", backgroundColor:"#90EE90"}} onClick={downloadCsv}> Download Csv <DownloadOutlined /></Button>
      </Space>
      <Table  columns={columns} dataSource={data} onChange={handleChange} rowClassName={getRowClassName}/>
    </>
  );
};
export default Machines;