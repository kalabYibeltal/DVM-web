import { Button, Space, Table } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { QRCode, Popover } from 'antd';


const Machines = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [data, setdata] = useState([])

  React.useEffect(() => {
    axios.get('https://dvm.onrender.com/vmachine/getall').then(res => {
        console.log(res.data.machines)
        setdata(res.data.machines)

    }).catch(err => {
        console.log(err)
    })

  }, [])


  function downloadQRCode() {
		const canvas = document.getElementById('qrcode')?.querySelector('canvas');
		if (canvas) {
			const url = canvas.toDataURL();
			const a = document.createElement('a');
			a.download = 'QRCode.png';
			a.href = url;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
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
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      // ],
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
          text: 'Tokyo',
          value: 'tokyo',
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
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
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
      render: () => 
      //  <Popover id={"qrcode"} overlayInnerStyle={{ padding: 0 }} content={<QRCode value={"name"} bordered={false}/>}>
      
      <Button variant="contained" color="success"> QR Code </Button>
      
      // {/* </Popover>, */}
     
    },


  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setIncomeSort}>Sort Income</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default Machines;