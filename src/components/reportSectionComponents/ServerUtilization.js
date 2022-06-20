import React from 'react'
import { TextField, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';

const columns = [
    { field: 'id', headerName: 'Rate', width: 150 },
    { field: 'firstName', headerName: 'AVG RAM %', width: 150 },
    { field: 'lastName', headerName: 'AVG CPU %', width: 150 },
    { field: 'age', headerName: 'Disk Utilization', type: 'number', width: 90, },
];

const rows = [

];

const ServerUtilization = () => {
    return (
        <>
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
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <Button sx={{ marginTop: 2 }} variant="contained" startIcon={<DownloadIcon />}>
                Download
            </Button>
        </>
    )
}

export default ServerUtilization