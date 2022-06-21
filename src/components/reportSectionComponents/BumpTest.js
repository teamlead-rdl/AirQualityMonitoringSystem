import React, { useState } from 'react'
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';

const columns = [
    { field: 'id', headerName: 'Date', width: 90 },
    { field: 'firstName', headerName: 'Site', width: 120 },
    { field: 'lastName', headerName: 'Branch', width: 130 },
    { field: 'Branch', headerName: 'Facilities', width: 130 },
    { field: 'Building', headerName: 'Building', width: 120 },
    { field: 'Floor', headerName: 'Floor', width: 100 },
    { field: 'Lab', headerName: 'Lab', width: 100 },
    { field: 'AQMI/O ID', headerName: 'AQMI/O ID', width: 120 },
    { field: 'Firmware Version', headerName: 'Status', width: 110 },
    { field: 'Hardware Version', headerName: 'Due Date', width: 110 },
];

const BumpTest = () => {

    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <TextField
                    sx={{ minWidth: 320 }}
                    label="From Date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    sx={{ minWidth: 320 }}
                    label="to date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                        <InputLabel >Device</InputLabel>
                        <Select
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <div style={{ height: 300, width: '100%', marginTop: 25 }}>
                <DataGrid
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                marginTop={4}
            >
                <Button variant="contained" startIcon={<DownloadIcon />}>
                    Download
                </Button>
            </Stack>
        </div>
    )
}

export default BumpTest