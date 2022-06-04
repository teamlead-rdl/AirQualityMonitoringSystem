import { Delete } from '@mui/icons-material';
import {
  Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
/* eslint-disable no-unused-vars */
function AlertWidget() {
  const [dataList, setDataList] = useState([
    {
      id: 0,
      time: '21-9-2022 06:00 PM',
      alertDescription: 'Sensor reading exceeding Danger level.',
      alarmType: 'Critical-Alert',
      sensorName: 'NH3 Sensor',
    },
    {
      id: 1,
      time: '10-05-2022 10:00 AM',
      alertDescription: 'Sensor not reading any data. Make sure the sensor is connected properly.',
      alarmType: 'Out-of-Range',
      sensorName: 'O2 Sensor',
    },
  ]);
  const [clearAlert, setClearAlert] = useState(false);
  const [clearAlertReason, setAlertReason] = useState('Reason 1');
  const [alertId, setAlertId] = useState('');
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
        <ClearAlert selectedRow={params.row} />,
      ],
    },
  ];

  function ClearAlert({ selectedRow }) {
    return (
      <Button
        variant="contained"
        color="success"
        startIcon={<Delete />}
        onClick={(e) => {
          setAlertId(selectedRow.id);
          setClearAlert(true);
        }}
      >
        Clear
      </Button>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setClearAlert(false);
  };
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Typography
        underline="hover"
        color="inherit"
        component={'h1'}
      >
        Alerts
      </Typography>
      <DataGrid
        rows={dataList}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        style={{ maxHeight: `${90}%` }}
      />
      <Dialog
        sx={{ '& .MuiDialog-paper': { minWidth: '60%' } }}
        maxWidth="sm"
        open={clearAlert}
      >
        <DialogTitle>
          Clear alert with reason
        </DialogTitle>
        <DialogContent>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md -space-y-px " style={{ textAlign: '-webkit-center' }}>
              <div className="container mx-auto outline-black ">
                <div className="inline ">
                  <div className="w-1/3  lg:w-3/5  pr-3 pl-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Select reason</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={clearAlertReason}
                        label="Select reason"
                        onChange={(e) => {
                          setAlertReason(e.target.value);
                        }}
                      >
                        <MenuItem value="Reason 1">Reason 1</MenuItem>
                        <MenuItem value="Reason 2">Reason 2</MenuItem>
                        <MenuItem value="Reason 3">Reason 3</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="float-right">
                <div className="rounded-md -space-y-px">
                  <Button
                    type="submit"
                  >
                    Clear
                  </Button>
                  <Button
                    onClick={() => {
                      setClearAlert(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AlertWidget;
