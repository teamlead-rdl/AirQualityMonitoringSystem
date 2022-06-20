import React, { useState } from 'react'
import { TextField, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';

const columns = [
    { field: 'Date', headerName: 'Date', width: 130 },
    { field: 'Time', headerName: 'Time', width: 130 },
    { field: 'User', headerName: 'User', width: 130 },
    { field: 'Location', headerName: 'Location', width: 130 },
    { field: 'Aqmio', headerName: 'Aqmi/o', width: 130 },
    { field: 'Sensor', headerName: 'Sensor', width: 130 },
    { field: 'PreviousValue', headerName: 'Previous Value', width: 130 },
    { field: 'UpdatedValue', headerName: 'Updated Value', width: 130 },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const SensorLog = () => {
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <TextField sx={{ minWidth: 320 }}
                    label="From Date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField sx={{ minWidth: 320 }}
                    label="to date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Stack>
            <div style={{ height: 300, width: '100%', marginTop: 25 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={4}
                    rowsPerPageOptions={[4]}
                />
            </div>
            <Button sx={{ marginTop: 2 }} variant="contained" startIcon={<DownloadIcon />}>
                Download
            </Button>
        </div>
    )
}

export default SensorLog