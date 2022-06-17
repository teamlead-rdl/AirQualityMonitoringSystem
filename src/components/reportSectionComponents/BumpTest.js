import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';


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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <TextField
                    sx={{ minWidth: 320 }}
                    label="From date"
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
                        <InputLabel id="demo-simple-select-label">Device</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            {/* <MenuItem value={10}>TWE Date</MenuItem>
                            <MenuItem value={20}>Bump Test Result</MenuItem> */}
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