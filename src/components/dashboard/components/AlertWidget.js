import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
/* eslint-disable no-unused-vars */
function AlertWidget() {
  const [dataList, setDataList] = useState([]);
  const columns = [
    {
      field: 'time',
      headerName: 'Time',
      width: 120,
    },
    {
      field: 'alertDescription',
      headerName: 'Alert Description',
      width: 450,
    },
    {
      field: 'alarmType',
      headerName: 'Alarm Type',
      width: 200,
    },
    {
      field: 'sensorName',
      headerName: 'Sensor Name',
      width: 200,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: (params) => [
        // <EditData selectedRow={params.row} />,
      ],
    },
  ];
  return (
    <div style={{ height: '100%', width: '100%' }}>
      Alerts
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${90}%` }}
      />
    </div>
  );
}

export default AlertWidget;
