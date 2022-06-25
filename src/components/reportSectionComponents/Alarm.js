import React, { useState, useEffect } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import { FetchAlarmReportDetails } from '../../services/LoginPageService';

const Alarm = (props) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [isLoading, setGridLoading] = useState(false);
    const [alarmReportList, setAlarmReportList] = useState([]);
    const [unTaggedAlarmReportList, setUnTaggedAlarmReportList] = useState();
    const [requestedPage, setRequestedPage] = useState("2");
    const [sortedType, setSortedType] = useState('ASC');
    const [sortColumn, setSortColumn] = useState("1");

    useEffect(() => {
        FetchAlarmReportDetails({}, AlarmReportHandleSuccess, AlarmReportHandleException);
    }, [unTaggedAlarmReportList]);

    const columns = [
        {
            field: 'a_date',
            headerName: 'Date',
            width: 130,
        },
        {
            field: 'a_time',
            headerName: 'Time',
            width: 130,
        },
        {
            field: 'deviceName',
            headerName: 'AQMI/O ID',
            width: 130,
        },
        {
            field: 'labDepName',
            headerName: 'Lab',
            width: 130,
        },
        {
            field: 'sensorTag',
            headerName: 'Sensor',
            width: 130,
        },
        {
            field: 'alertType',
            headerName: 'Alarm Type',
            width: 130,
        },
        {
            field: 'Reason',
            headerName: 'Reason',
            width: 130,
        },
    ];

    const HandleDeviceChange = (deviceId) => {
        setDeviceId(deviceId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGridLoading(true);
        FetchAlarmReportDetails({ requestedPage, sortedType, sortColumn, deviceId, fromDate, toDate }, AlarmReportHandleSuccess, AlarmReportHandleException);
    };

    const AlarmReportHandleSuccess = (dataObject) => {
        setAlarmReportList(dataObject.data);
        setGridLoading(false);
    }

    const AlarmReportHandleException = () => { }

    const handleCancel = () => {
        setFromDate('');
        setToDate('');
        setDeviceId([]);
        setGridLoading(false);
        setUnTaggedAlarmReportList(!unTaggedAlarmReportList);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={2} marginTop={1.5}>
                    <FormControl>
                        <Button variant="outlined" startIcon={<DownloadIcon />}>
                            Download
                        </Button>
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" autoFocus onClick={handleCancel} >
                            Cancel
                        </Button>
                    </FormControl>
                    <FormControl >
                        <Button variant="contained" autoFocus type="submit">
                            Apply Filters
                        </Button>
                    </FormControl>
                    <TextField sx={{ minWidth: 220 }}
                        label="From Date"
                        type="date"
                        value={fromDate}
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setFromDate(e.target.value);
                        }}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField sx={{ minWidth: 220 }}
                        label="to date"
                        type="date"
                        value={toDate}
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setToDate(e.target.value);
                        }}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Box sx={{ minWidth: 220 }}>
                        <FormControl fullWidth>
                            <InputLabel >AQMI/AQMO</InputLabel>
                            <Select
                                value={deviceId}
                                label="Age"
                                onChange={(e) => {
                                    HandleDeviceChange(e.target.value)
                                }}
                            >
                                {props.deviceList.map((data) => (
                                    <MenuItem value={data.id}>{data.deviceName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                </Stack>
                <div style={{ height: 270, width: '100%', marginTop: 25 }}>
                    <DataGrid
                        rows={alarmReportList}
                        columns={columns}
                        loading={isLoading}
                        disableSelectionOnClick
                    />
                </div>
            </form>
        </div>
    )
}

export default Alarm