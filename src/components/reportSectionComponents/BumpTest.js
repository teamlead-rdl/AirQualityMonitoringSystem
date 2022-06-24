import React, { useState, useEffect } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import { FetchBumpTestReportDetails } from '../../services/LoginPageService';

const BumpTest = (props) => {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [device_id, setDeviceId] = useState('');
    const [isLoading, setGridLoading] = useState(false);
    const [bumpTestReportList, setBumpTestReportList] = useState([]);
    const [unTaggedBumpTestReportList, setUnTaggedBumpTestReportList] = useState();

    useEffect(() => {
        FetchBumpTestReportDetails({}, BumpTestReportHandleSuccess, BumpTestReportHandleException);
    }, [unTaggedBumpTestReportList]);

    const columns = [
        {
            field: 'created_at',
            headerName: 'Date',
            width: 100,
        },
        {
            field: 'created_at',
            headerName: 'Date',
            width: 100,
        },
        {
            field: 'stateName',
            headerName: 'Site',
            width: 100,
        },
        {
            field: 'branchName',
            headerName: 'Branch',
            width: 100,
        },
        {
            field: 'facilityName',
            headerName: 'Facilities',
            width: 100,
        },
        {
            field: 'buildingName',
            headerName: 'Building',
            width: 100,
        },
        {
            field: 'floorName',
            headerName: 'Floor',
            width: 100,
        },
        {
            field: 'labDepName',
            headerName: 'Lab',
            width: 100,
        },
        {
            field: 'deviceName',
            headerName: 'AQMI/O ID',
            width: 100,
        },
        {
            field: 'sensorTagName',
            headerName: 'Sensor',
            width: 100,
        },
        {
            field: 'result',
            headerName: 'Status',
            width: 100,
        },
        {
            field: 'lastDueDate',
            headerName: 'Due Date',
            width: 100,
        },
    ];

    const HandleDeviceChange = (device_id) => {
        setDeviceId(device_id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setGridLoading(true);
        FetchBumpTestReportDetails({ device_id, fromDate, toDate }, BumpTestReportHandleSuccess, BumpTestReportHandleException);
    };

    const BumpTestReportHandleSuccess = (dataObject) => {
        setBumpTestReportList(dataObject.data);
        setGridLoading(false);
    }

    const BumpTestReportHandleException = () => { }

    const handleCancel = () => {
        setFromDate('');
        setToDate('');
        setDeviceId([]);
        setGridLoading(false);
        setUnTaggedBumpTestReportList(!unTaggedBumpTestReportList);
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
                    <TextField
                        sx={{ minWidth: 220 }}
                        label="From Date"
                        type="date"
                        variant="outlined"
                        value={fromDate}
                        required
                        onChange={(e) => {
                            setFromDate(e.target.value);
                        }}
                        autoComplete="off"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        sx={{ minWidth: 220 }}
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
                            <InputLabel >Device</InputLabel>
                            <Select
                                value={device_id}
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
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    marginTop={2}
                >
                </Stack>
                <div style={{ height: 300, width: '100%', marginTop: 25 }}>
                    <DataGrid
                        rows={bumpTestReportList}
                        columns={columns}
                        loading={isLoading}
                        disableSelectionOnClick
                    />
                </div>
            </form>
        </div>
    )
}

export default BumpTest