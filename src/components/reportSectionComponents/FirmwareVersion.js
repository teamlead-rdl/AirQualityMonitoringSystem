import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

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
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
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