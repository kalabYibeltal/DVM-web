import * as React from 'react';
import {
  DataGridPro,
  GridToolbar,
  FilterColumnsArgs,
  GetColumnForNewFilterArgs,
} from '@mui/x-data-grid-pro';

import { useDemoData } from '@mui/x-data-grid-generator';
import axios from 'axios';
import { useState } from 'react';

const VISIBLE_FIELDS = ['name', 'city', 'country', 'dateCreated', 'isAdmin'];

const customcolumns = [{'feild':"_id","headerName":"_id","hide":true,"type":"string"},
                      {'feild':"name","headerName":"name","hide":false,"type":"string"},
                      {'feild':"city","headerName":"city","hide":false,"type":"string"},
                      {'feild':"building","headerName":"building","hide":false,"type":"string"},
                      {'feild':"numberofitems","headerName":"numberofitems","hide":false,"type":"number"},
                      {'feild':"income","headerName":"income","hide":false,"type":"number"}]


export default function Machines() {
  const { data } = useDemoData({
    dataSet: 'Employee',          
    visibleFields: VISIBLE_FIELDS,
    rowLength: 10,
  });
              
  // const [data, setdata] = useState(data2)
  // setdata(data2)
  console.log(data)

  React.useEffect(() => {
		axios.get('https://dvm.onrender.com/vmachine/getall').then(res => {
        // console.log(res.data.machines)
        // console.log(data)
        // setdata({
        //   ...data,
        //   columns: customcolumns,
        //   rows: res.data.machines
        // })
        // console.log(data)
        // console.log("grid")
      

    }).catch(err => {
        console.log(err)
    })

	}, [])

  const filterColumns = ({ field, columns, currentFilters }: FilterColumnsArgs) => {
    // remove already filtered fields from list of columns
    const filteredFields = currentFilters?.map((item) => item.field);
    return columns
      .filter(
        (colDef) =>
          colDef.filterable &&
          (colDef.field === field || !filteredFields.includes(colDef.field)),
      )
      .map((column) => column.field);
  };

  const getColumnForNewFilter = ({
    currentFilters,
    columns,
  }: GetColumnForNewFilterArgs) => {
    const filteredFields = currentFilters?.map(({ field }) => field);
    const columnForNewFilter = columns
      .filter(
        (colDef) => colDef.filterable && !filteredFields.includes(colDef.field),
      )
      .find((colDef) => colDef.filterOperators?.length);
    return columnForNewFilter?.field ?? null;
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
       {/* {console.log(data)} */}
       {/* {console.log("data")} */}
      <DataGridPro
        {...data}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          filterPanel: {
            filterFormProps: {
              filterColumns,
            },
            getColumnForNewFilter,
          },
        }}
      />
    </div>
  );
}