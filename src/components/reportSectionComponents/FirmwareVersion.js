import React, { useState } from 'react'
import { FormControl, Select, Button, Stack, InputLabel, MenuItem, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Site', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'Branch', headerName: 'Branch', width: 130 },
    { field: 'Building', headerName: 'Building', width: 130 },
    { field: 'Floor', headerName: 'Floor', width: 130 },
    { field: 'Lab', headerName: 'Lab', width: 130 },
    { field: 'AQMI/O ID', headerName: 'AQMI/O ID', width: 130 },
    { field: 'Firmware Version', headerName: 'Firmware Version', width: 130 },
    { field: 'Hardware Version', headerName: 'Hardware Version', width: 130 },

];

const rows = [
];

const ApplicationVersion = () => {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <div style={{ height: 300, width: '100%', marginTop: 25 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Stack
                marginTop={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2} >
                <Button variant="contained" startIcon={<DownloadIcon />}>
                    Download
                </Button>
            </Stack>
        </>
    )
}

export default ApplicationVersion